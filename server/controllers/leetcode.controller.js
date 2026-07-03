import User from '../models/User.js';
import Problem from '../models/Problem.js';
import UserSolvedProblem from '../models/UserSolvedProblem.js';
import SyncLog from '../models/SyncLog.js';
import { leetcodeService } from '../services/leetcode/leetcode.service.js';
import { groqService } from '../services/groq/groq.service.js';
import { calculateXP, getLevelInfo } from '../utils/progression.js';

export async function connectProfile(req, res) {
  try {
    const { leetcodeUsername } = req.body;
    const userId = req.userId;

    if (!leetcodeUsername || leetcodeUsername.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'LeetCode username is required.'
      });
    }

    const cleanUsername = leetcodeUsername.trim();

    // 1. Verify username exists publicly on LeetCode
    console.log(`Verifying LeetCode username: "${cleanUsername}"`);
    try {
      await leetcodeService.getProfile(cleanUsername);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: `Could not verify LeetCode profile for "${cleanUsername}". Ensure it exists and is public.`
      });
    }

    // 2. Save connection details
    await User.findByIdAndUpdate(userId, {
      $set: {
        'leetcode.username': cleanUsername,
        'leetcode.connectedAt': new Date(),
        'leetcode.lastSyncedAt': null
      }
    });

    return res.json({
      success: true,
      leetcodeUsername: cleanUsername,
      message: 'LeetCode profile connected successfully.'
    });
  } catch (error) {
    console.error('LeetCode connect error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error connecting LeetCode profile.'
    });
  }
}

export async function syncProfile(req, res) {
  const userId = req.userId;
  const syncLog = new SyncLog({ userId, status: 'FAILED' });

  try {
    // 1. Fetch User details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const leetcodeUsername = user.leetcode?.username;
    if (!leetcodeUsername) {
      return res.status(400).json({
        success: false,
        message: 'No LeetCode profile is connected to this account.'
      });
    }

    await syncLog.save(); // Save initial log

    // Store pre-sync level details
    const preSyncLvl = getLevelInfo(user.progression.totalXP);

    // 2. Fetch recent accepted submissions
    console.log(`Syncing submissions for user: "${leetcodeUsername}"...`);
    const submissions = await leetcodeService.getRecentSubmissions(leetcodeUsername, 20);

    let xpGained = 0;
    const syncedProblems = [];
    
    // Diagnostic counters
    let canonicalMatches = 0;
    let unmatchedCount = 0;
    let existingSolvedCount = 0;

    // 3. Process each submission
    for (const sub of submissions) {
      const { titleSlug, title, timestamp } = sub;

      // a. Check if problem is already in database, or fetch details to insert it
      let problem = await Problem.findOne({ titleSlug });

      if (!problem) {
        console.log(`New problem encountered: "${titleSlug}". Querying details...`);
        try {
          const details = await leetcodeService.getQuestionDetails(titleSlug);
          
          // Groq AI Evaluation
          console.log(`Running Groq AI complexity evaluation for: "${details.title}"`);
          const aiAnalysis = await groqService.analyzeProblemComplexity(
            details.title,
            details.difficulty,
            details.category
          );

          const xpValues = calculateXP(details.difficulty, aiAnalysis);

          problem = new Problem({
            leetcodeId: details.leetcodeId,
            frontendQuestionId: details.frontendQuestionId,
            title: details.title,
            titleSlug: details.titleSlug,
            difficulty: details.difficulty,
            category: details.category,
            xp: {
              baseXP: xpValues.baseXP,
              complexityBonus: xpValues.complexityBonus,
              finalXP: xpValues.finalXP,
              scoringVersion: 1
            },
            aiAnalysis: aiAnalysis || undefined
          });

          await problem.save();
          canonicalMatches++;
        } catch (err) {
          console.error(`Skipping problem "${titleSlug}" due to details fetch failure:`, err.message);
          unmatchedCount++;
          continue;
        }
      } else {
        canonicalMatches++;
      }

      // b. Verify if user was already rewarded for this problem
      const alreadySolved = await UserSolvedProblem.findOne({ userId, titleSlug });
      if (alreadySolved) {
        existingSolvedCount++;
        continue; // Deduplicate
      }

      // c. Create Solve record
      try {
        const userSolved = new UserSolvedProblem({
          userId,
          problemId: problem._id,
          titleSlug: problem.titleSlug,
          solvedAt: timestamp,
          xpAwarded: problem.xp.finalXP,
          scoringVersion: problem.xp.scoringVersion
        });

        await userSolved.save();

        xpGained += problem.xp.finalXP;
        syncedProblems.push({
          title: problem.title,
          titleSlug: problem.titleSlug,
          xpAwarded: problem.xp.finalXP
        });
      } catch (err) {
        // Compound index double checks (protect against concurrent API requests)
        if (err.code === 11000) {
          existingSolvedCount++;
          continue;
        }
        console.error(`Failed to record solve for "${titleSlug}":`, err.message);
      }
    }

    const uniqueSlugs = new Set(submissions.map(s => s.titleSlug)).size;

    // Log diagnostic logs
    console.log(`[SYNC] username=${leetcodeUsername}`);
    console.log(`[SYNC] upstream accepted records=${submissions.length}`);
    console.log(`[SYNC] normalized unique slugs=${uniqueSlugs}`);
    console.log(`[SYNC] canonical matches=${canonicalMatches}`);
    console.log(`[SYNC] unmatched=${unmatchedCount}`);
    console.log(`[SYNC] existing solved records=${existingSolvedCount}`);
    console.log(`[SYNC] newly rewarded=${syncedProblems.length}`);
    console.log(`[SYNC] xp gained=${xpGained}`);
    console.log(`[SYNC] final total xp=${user.progression.totalXP + xpGained}`);

    // 4. Update user XP
    let levelUp = false;
    let postSyncLvl = preSyncLvl;

    if (xpGained > 0) {
      user.progression.totalXP += xpGained;
      postSyncLvl = getLevelInfo(user.progression.totalXP);
      levelUp = postSyncLvl.level > preSyncLvl.level;
    }

    user.leetcode.lastSyncedAt = new Date();
    await user.save();

    // 5. Log success status
    syncLog.status = 'SUCCESS';
    syncLog.problemsSyncedCount = syncedProblems.length;
    syncLog.xpGained = xpGained;
    syncLog.completedAt = new Date();
    await syncLog.save();

    return res.json({
      success: true,
      username: leetcodeUsername,
      newlySolvedCount: syncedProblems.length,
      xpGained,
      previousLevel: preSyncLvl.level,
      currentLevel: postSyncLvl.level,
      levelUp,
      syncedProblems
    });
  } catch (error) {
    console.error('Profile sync error:', error.message);
    
    syncLog.status = 'FAILED';
    syncLog.error = error.message;
    syncLog.completedAt = new Date();
    await syncLog.save().catch(err => console.error('Failed to save fail log:', err.message));

    return res.status(500).json({
      success: false,
      message: `Synchronization failed: ${error.message}`
    });
  }
}
