import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Problem from '../models/Problem.js';
import UserSolvedProblem from '../models/UserSolvedProblem.js';
import { leetcodeService } from '../services/leetcode/leetcode.service.js';
import { groqService } from '../services/groq/groq.service.js';
import { calculateXP, getLevelInfo } from '../utils/progression.js';

dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected.');

    // 1. Find or create a test user
    const email = 'aniket_rpg_test@example.com';
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        passwordHash: 'hashed_password_placeholder',
        username: 'aniket_solves_rpg',
        leetcode: {
          username: 'aniket_solves',
          connectedAt: new Date()
        },
        progression: {
          totalXP: 0
        }
      });
      await user.save();
      console.log('Created test user.');
    } else {
      // Reset their XP and solved problems to trace a clean first sync
      user.progression.totalXP = 0;
      user.leetcode.username = 'aniket_solves';
      await user.save();
      await UserSolvedProblem.deleteMany({ userId: user._id });
      console.log('Reset test user XP and solved problems.');
    }

    const userId = user._id;
    const leetcodeUsername = user.leetcode.username;
    console.log(`Starting sync pipeline for user: "${leetcodeUsername}"`);

    // 2. Fetch submissions
    const submissions = await leetcodeService.getRecentSubmissions(leetcodeUsername, 20);
    console.log(`Fetched ${submissions.length} submissions from LeetCode.`);

    let xpGained = 0;
    const syncedProblems = [];

    // 3. Sync loop
    for (const sub of submissions) {
      const { titleSlug, title, timestamp } = sub;
      console.log(`Processing submission: "${title}" (${titleSlug})`);

      let problem = await Problem.findOne({ titleSlug });

      if (!problem) {
        console.log(`  -> Problem not in DB. Fetching metadata for slug: ${titleSlug}`);
        const details = await leetcodeService.getQuestionDetails(titleSlug);
        console.log(`  -> Fetched details. Title: "${details.title}", Difficulty: ${details.difficulty}`);

        // AI analysis
        const aiAnalysis = await groqService.analyzeProblemComplexity(
          details.title,
          details.difficulty,
          details.category
        );
        console.log(`  -> AI Complexity rating: ${aiAnalysis ? 'SUCCESS' : 'FAILED/NULL'}`);

        const xpValues = calculateXP(details.difficulty, aiAnalysis);
        console.log(`  -> XP calculated: base=${xpValues.baseXP}, bonus=${xpValues.complexityBonus}, final=${xpValues.finalXP}`);

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
        console.log('  -> Saved new problem to database.');
      } else {
        console.log(`  -> Problem already exists in DB. finalXP: ${problem.xp.finalXP}`);
      }

      // Check double solve
      const alreadySolved = await UserSolvedProblem.findOne({ userId, titleSlug });
      if (alreadySolved) {
        console.log('  -> User already rewarded for this problem. Skipping.');
        continue;
      }

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
      console.log(`  -> Awarded +${problem.xp.finalXP} XP.`);
    }

    // Update user
    user.progression.totalXP += xpGained;
    user.leetcode.lastSyncedAt = new Date();
    await user.save();

    console.log('\n--- Sync Pipeline Summary ---');
    console.log(`Newly Solved Count: ${syncedProblems.length}`);
    console.log(`Total XP Gained:    ${xpGained}`);
    console.log(`User Total XP:      ${user.progression.totalXP}`);
    const lvlInfo = getLevelInfo(user.progression.totalXP);
    console.log(`User Level:         ${lvlInfo.level} (${lvlInfo.percent}% to next)`);

    await mongoose.disconnect();
    console.log('\nDatabase disconnected.');
  } catch (err) {
    console.error('Error running sync script:', err);
    process.exit(1);
  }
}

run();
