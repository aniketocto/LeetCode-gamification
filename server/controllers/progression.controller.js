import User from '../models/User.js';
import UserSolvedProblem from '../models/UserSolvedProblem.js';
import Problem from '../models/Problem.js';
import { getLevelInfo, getPlayerRank } from '../utils/progression.js';

// Helper to convert dates to YYYY-MM-DD local string matching user timezone offset or UTC
function getLocalDateString(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates current active streak of consecutive days.
 */
function calculateStreak(solvedDates) {
  if (solvedDates.size === 0) return 0;

  const today = getLocalDateString(new Date());
  
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = getLocalDateString(yesterdayDate);

  let checkDate = new Date();

  // Decide starting point: today or yesterday
  if (solvedDates.has(today)) {
    checkDate = new Date();
  } else if (solvedDates.has(yesterday)) {
    checkDate = yesterdayDate;
  } else {
    return 0; // Broken streak
  }

  let streak = 0;
  while (true) {
    const dateStr = getLocalDateString(checkDate);
    if (solvedDates.has(dateStr)) {
      streak++;
      // Move back 1 day
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export async function getProgression(req, res) {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    // 1. Fetch solved problems
    const solvedProblems = await UserSolvedProblem.find({ userId })
      .populate('problemId')
      .sort({ solvedAt: -1 });

    // Derive totalXP directly from the sum of all verified solved problems to ensure strict consistency
    const totalXP = solvedProblems.reduce((sum, sp) => sum + sp.xpAwarded, 0);
    const lvlInfo = getLevelInfo(totalXP);
    const rank = getPlayerRank(lvlInfo.level);

    // 2. Calculate streak
    const solvedDates = new Set(
      solvedProblems.map(sp => getLocalDateString(sp.solvedAt))
    );
    const streak = calculateStreak(solvedDates);

    // 3. Count categories & difficulties
    let easyCleared = 0;
    let mediumCleared = 0;
    let hardCleared = 0;

    solvedProblems.forEach(sp => {
      const difficulty = sp.problemId?.difficulty;
      if (difficulty === 'Easy') easyCleared++;
      else if (difficulty === 'Medium') mediumCleared++;
      else if (difficulty === 'Hard') hardCleared++;
    });

    // 4. Fetch counts of seeded problems to calculate relative completion percentages
    const easyTotal = await Problem.countDocuments({ difficulty: 'Easy' });
    const mediumTotal = await Problem.countDocuments({ difficulty: 'Medium' });
    const hardTotal = await Problem.countDocuments({ difficulty: 'Hard' });
    const grandTotal = easyTotal + mediumTotal + hardTotal;

    return res.json({
      success: true,
      progression: {
        totalXP,
        level: lvlInfo.level,
        rank,
        xpEarnedInLevel: lvlInfo.xpEarnedInLevel,
        xpRequiredForNextLevel: lvlInfo.xpRequiredForNextLevel,
        percent: lvlInfo.percent,
        streak,
        stats: {
          easyCleared,
          easyTotal,
          mediumCleared,
          mediumTotal,
          hardCleared,
          hardTotal,
          totalCleared: solvedProblems.length,
          grandTotal
        }
      }
    });
  } catch (error) {
    console.error('Error fetching progression details:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error calculating progress metrics.'
    });
  }
}

export async function getSolvedQuests(req, res) {
  try {
    const userId = req.userId;

    // Fetch user solved records populated with metadata
    const solvedProblems = await UserSolvedProblem.find({ userId })
      .populate('problemId')
      .sort({ solvedAt: -1 });

    const quests = solvedProblems.map(sp => {
      const p = sp.problemId;
      return {
        id: sp._id,
        title: p ? p.title : 'Unknown Problem',
        titleSlug: sp.titleSlug,
        frontendQuestionId: p ? p.frontendQuestionId : '0',
        difficulty: p ? p.difficulty : 'Easy',
        topics: p ? (p.topics && p.topics.length > 0 ? p.topics : [p.category]) : [],
        xpAwarded: sp.xpAwarded,
        solvedAt: sp.solvedAt,
        firstDetectedAt: sp.firstDetectedAt,
        source: 'leetcode'
      };
    });

    return res.json({
      success: true,
      count: quests.length,
      quests
    });
  } catch (error) {
    console.error('Error fetching solved quests:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error retrieving solved quests.'
    });
  }
}

export async function resetProgression(req, res) {
  try {
    const userId = req.userId;

    // Reset user XP and LeetCode connections
    await User.findByIdAndUpdate(userId, {
      $set: {
        'progression.totalXP': 0,
        'leetcode.username': null,
        'leetcode.connectedAt': null,
        'leetcode.lastSyncedAt': null
      }
    });

    // Clear user solved problems
    await UserSolvedProblem.deleteMany({ userId });

    return res.json({
      success: true,
      message: 'Quest logs successfully scrubbed. Progression database reset.'
    });
  } catch (error) {
    console.error('Error resetting progression:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error attempting progress reset.'
    });
  }
}
