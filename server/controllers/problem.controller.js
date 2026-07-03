import Problem from '../models/Problem.js';
import UserSolvedProblem from '../models/UserSolvedProblem.js';

export async function getProblems(req, res) {
  try {
    const { difficulty, category, status, search } = req.query;
    const userId = req.userId;

    // 1. Build database filter object
    const query = {};

    if (difficulty && difficulty !== 'ALL') {
      // Map API query (Easy, Medium, Hard)
      query.difficulty = difficulty;
    }

    if (category && category !== 'ALL') {
      query.category = category;
    }

    if (search) {
      const cleanSearch = search.trim();
      const numSearch = Number(cleanSearch);
      
      if (!isNaN(numSearch)) {
        // If searching by problem number ID
        query.leetcodeId = numSearch;
      } else {
        // Text title search
        query.title = { $regex: cleanSearch, $options: 'i' };
      }
    }

    // 2. Fetch problems matching filters
    const problems = await Problem.find(query).sort({ leetcodeId: 1 });

    // 3. Fetch completed problems for this user to map status
    const userSolved = await UserSolvedProblem.find({ userId }).select('titleSlug solvedAt xpAwarded');
    const solvedMap = new Map(userSolved.map(item => [item.titleSlug, item]));

    // 4. Transform list to include completion status and date
    let results = problems.map(p => {
      const solvedData = solvedMap.get(p.titleSlug);
      return {
        id: p.leetcodeId,
        frontendQuestionId: p.frontendQuestionId,
        title: p.title,
        titleSlug: p.titleSlug,
        difficulty: p.difficulty,
        category: p.category,
        xp: p.xp.finalXP,
        isCompleted: !!solvedData,
        solvedAt: solvedData ? solvedData.solvedAt : null,
        xpAwarded: solvedData ? solvedData.xpAwarded : 0
      };
    });

    // 5. Apply "status" filter if necessary (ALL, PENDING, COMPLETED)
    if (status && status !== 'ALL') {
      if (status === 'COMPLETED') {
        results = results.filter(r => r.isCompleted);
      } else if (status === 'PENDING') {
        results = results.filter(r => !r.isCompleted);
      }
    }

    return res.json({
      success: true,
      count: results.length,
      problems: results
    });
  } catch (error) {
    console.error('Error fetching problems:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error retrieving problem board.'
    });
  }
}

export async function getProblemBySlug(req, res) {
  try {
    const { slug } = req.params;
    const userId = req.userId;

    const problem = await Problem.findOne({ titleSlug: slug });
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found.'
      });
    }

    const solvedData = await UserSolvedProblem.findOne({ userId, titleSlug: slug });

    return res.json({
      success: true,
      problem: {
        id: problem.leetcodeId,
        frontendQuestionId: problem.frontendQuestionId,
        title: problem.title,
        titleSlug: problem.titleSlug,
        difficulty: problem.difficulty,
        category: problem.category,
        xp: problem.xp,
        aiAnalysis: problem.aiAnalysis,
        isCompleted: !!solvedData,
        solvedAt: solvedData ? solvedData.solvedAt : null
      }
    });
  } catch (error) {
    console.error('Error fetching problem details:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error retrieving problem details.'
    });
  }
}
