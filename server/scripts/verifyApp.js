import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { getLevelInfo, getPlayerRank, calculateXP } from '../utils/progression.js';
import { normalizeProfile, normalizeSubmissions, normalizeQuestion } from '../services/leetcode/leetcode.normalizer.js';
import User from '../models/User.js';
import Problem from '../models/Problem.js';
import UserSolvedProblem from '../models/UserSolvedProblem.js';

dotenv.config();

const results = {
  config: 'PENDING',
  imports: 'PENDING',
  utilities: 'PENDING',
  normalization: 'PENDING',
  idempotency: 'PENDING',
  apiHealth: 'PENDING'
};

async function runVerification() {
  console.log('=== ALGO QUEST APPLICATION SYSTEM VERIFICATION ===\n');

  // 1. Configuration Validation
  try {
    const requiredEnv = ['PORT', 'MONGO_URI', 'JWT_SECRET'];
    const missing = requiredEnv.filter(key => !process.env[key]);
    if (missing.length > 0) {
      throw new Error(`Missing environment variables in .env: ${missing.join(', ')}`);
    }
    results.config = 'PASS';
    console.log('✓ Configuration: PASS');
  } catch (err) {
    results.config = `FAIL - ${err.message}`;
    console.log('✗ Configuration: FAIL');
  }

  // 2. Server Imports Validation
  try {
    if (!User || !Problem || !UserSolvedProblem) {
      throw new Error('Mongoose models failed to load.');
    }
    if (!getLevelInfo || !getPlayerRank || !calculateXP) {
      throw new Error('Progression utilities failed to load.');
    }
    if (!normalizeProfile || !normalizeSubmissions || !normalizeQuestion) {
      throw new Error('LeetCode normalizer utilities failed to load.');
    }
    results.imports = 'PASS';
    console.log('✓ Server Imports: PASS');
  } catch (err) {
    results.imports = `FAIL - ${err.message}`;
    console.log('✗ Server Imports: FAIL');
  }

  // 3. Progression Utilities Validation
  try {
    // Level calculations
    // LV 1: 0-49 XP
    const lvl1Info = getLevelInfo(40);
    if (lvl1Info.level !== 1 || lvl1Info.xpEarnedInLevel !== 40 || lvl1Info.xpRequiredForNextLevel !== 50) {
      throw new Error(`Level calculation error for XP 40: ${JSON.stringify(lvl1Info)}`);
    }

    // LV 2: 50-119 XP
    const lvl2Info = getLevelInfo(50);
    if (lvl2Info.level !== 2 || lvl2Info.xpEarnedInLevel !== 0 || lvl2Info.xpRequiredForNextLevel !== 70) {
      throw new Error(`Level calculation error for XP 50: ${JSON.stringify(lvl2Info)}`);
    }

    // LV 3: 120-209 XP
    const lvl3Info = getLevelInfo(120);
    if (lvl3Info.level !== 3 || lvl3Info.xpEarnedInLevel !== 0 || lvl3Info.xpRequiredForNextLevel !== 90) {
      throw new Error(`Level calculation error for XP 120: ${JSON.stringify(lvl3Info)}`);
    }

    // Ranks checks
    if (getPlayerRank(1) !== 'ROOKIE CODER' || getPlayerRank(4) !== 'BUG CATCHER' || getPlayerRank(20) !== 'ALGORITHM MASTER') {
      throw new Error(`Rank calculation error for levels 1/4/20: R1=${getPlayerRank(1)}, R4=${getPlayerRank(4)}, R20=${getPlayerRank(20)}`);
    }

    // XP calculation checks
    const easyXP = calculateXP('Easy', null);
    if (easyXP.finalXP !== 25) throw new Error(`Base Easy XP error: ${easyXP.finalXP}`);

    const mediumXP = calculateXP('Medium', {
      implementationComplexity: 5,
      conceptualDifficulty: 5,
      edgeCaseComplexity: 5,
      reasoningDepth: 5
    });
    // rawBonus = (5 * 1.0) + (5 * 1.5) + (5 * 1.0) + (5 * 1.5) = 5 + 7.5 + 5 + 7.5 = 25
    // complexityBonus = Math.round(25 / 5) * 5 = 25
    // finalXP = 60 + 25 = 85
    if (mediumXP.finalXP !== 85) throw new Error(`Medium XP evaluation error: expected 85, got ${mediumXP.finalXP}`);

    results.utilities = 'PASS';
    console.log('✓ Progression Utilities: PASS');
  } catch (err) {
    results.utilities = `FAIL - ${err.message}`;
    console.log('✗ Progression Utilities: FAIL');
  }

  // 4. Normalizer Logic Validation
  try {
    // Profile normalizer
    const mockProfileGql = {
      matchedUser: {
        username: 'test_user',
        submitStats: {
          acSubmissionNum: [
            { difficulty: 'All', count: 15 },
            { difficulty: 'Easy', count: 10 },
            { difficulty: 'Medium', count: 5 },
            { difficulty: 'Hard', count: 0 }
          ]
        }
      }
    };
    const normProfile = normalizeProfile(mockProfileGql);
    if (normProfile.username !== 'test_user' || normProfile.easySolved !== 10 || normProfile.mediumSolved !== 5 || normProfile.totalSolved !== 15) {
      throw new Error(`Profile normalizer structure mismatch: ${JSON.stringify(normProfile)}`);
    }

    // Question normalizer
    const mockQuestionGql = {
      question: {
        questionId: '101',
        questionFrontendId: '101',
        title: 'Symmetric Tree',
        titleSlug: 'symmetric-tree',
        difficulty: 'Easy',
        topicTags: [{ name: 'Tree', slug: 'tree' }]
      }
    };
    const normQuestion = normalizeQuestion(mockQuestionGql);
    if (normQuestion.leetcodeId !== 101 || normQuestion.category !== 'Tree' || normQuestion.difficulty !== 'Easy') {
      throw new Error(`Question normalizer structure mismatch: ${JSON.stringify(normQuestion)}`);
    }

    results.normalization = 'PASS';
    console.log('✓ Response Normalization: PASS');
  } catch (err) {
    results.normalization = `FAIL - ${err.message}`;
    console.log('✗ Response Normalization: FAIL');
  }

  // 5. XP Idempotency Logic Validation (Database Integration check)
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      
      // Seed a temporary test user and problem
      const testEmail = 'verify_test_email@example.com';
      const testUser = await User.findOneAndUpdate(
        { email: testEmail },
        { email: testEmail, passwordHash: 'hash', username: 'verify_test_user' },
        { upsert: true, new: true }
      );

      const testProblem = await Problem.findOneAndUpdate(
        { titleSlug: 'verify-test-problem' },
        { 
          leetcodeId: 9999, 
          frontendQuestionId: '9999', 
          title: 'Verify Test Problem', 
          titleSlug: 'verify-test-problem',
          difficulty: 'Easy',
          category: 'Array',
          xp: { baseXP: 25, finalXP: 25 }
        },
        { upsert: true, new: true }
      );

      // Clean out any previous solve record for this test case
      await UserSolvedProblem.deleteMany({ userId: testUser._id, titleSlug: 'verify-test-problem' });

      // First solve entry: should succeed
      const solve1 = new UserSolvedProblem({
        userId: testUser._id,
        problemId: testProblem._id,
        titleSlug: 'verify-test-problem',
        solvedAt: new Date(),
        xpAwarded: 25,
        scoringVersion: 1
      });
      await solve1.save();

      // Second solve entry: should fail due to unique compound index constraint { userId, titleSlug }
      try {
        const solve2 = new UserSolvedProblem({
          userId: testUser._id,
          problemId: testProblem._id,
          titleSlug: 'verify-test-problem',
          solvedAt: new Date(),
          xpAwarded: 25,
          scoringVersion: 1
        });
        await solve2.save();
        // If it reaches here, the uniqueness constraint is missing!
        throw new Error('XP double award database unique constraint is not enforced.');
      } catch (err) {
        if (err.code === 11000) {
          // Success: Database correctly blocked duplicate entries!
        } else {
          throw err;
        }
      }

      // Cleanup test documents
      await UserSolvedProblem.deleteMany({ userId: testUser._id });
      await User.deleteOne({ _id: testUser._id });
      await Problem.deleteOne({ _id: testProblem._id });

      results.idempotency = 'PASS';
      console.log('✓ XP Idempotency (Database): PASS');
    } catch (err) {
      results.idempotency = `FAIL - ${err.message}`;
      console.log('✗ XP Idempotency (Database): FAIL');
    } finally {
      await mongoose.disconnect();
    }
  } else {
    results.idempotency = 'SKIP - MONGO_URI is missing';
    console.log('- XP Idempotency (Database): SKIPPED');
  }

  // 6. API Health Endpoint Verification
  try {
    const healthUrl = `http://localhost:${process.env.PORT || 5000}/health`;
    const res = await fetch(healthUrl);
    const data = await res.json();
    if (res.ok && data.status === 'ok') {
      results.apiHealth = 'PASS';
      console.log('✓ API Health Endpoint: PASS');
    } else {
      throw new Error(`Returned status ${res.status} with content: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    results.apiHealth = `FAIL - ${err.message}`;
    console.log('✗ API Health Endpoint: FAIL');
  }

  // Output Final Report
  console.log('\n==================================================');
  console.log('VERIFICATION REPORT CARD:');
  console.log(`- Config Validation:       ${results.config}`);
  console.log(`- Server Module Imports:   ${results.imports}`);
  console.log(`- Progression Utilities:   ${results.utilities}`);
  console.log(`- Response Normalization:  ${results.normalization}`);
  console.log(`- XP Idempotency (DB):     ${results.idempotency}`);
  console.log(`- API Health Endpoint:     ${results.apiHealth}`);
  console.log('==================================================');

  // Return non-zero exit code if any critical test fails
  const failed = Object.values(results).some(res => typeof res === 'string' && res.startsWith('FAIL'));
  if (failed) {
    console.error('\nVerification failed! Please fix outstanding issues.');
    process.exit(1);
  } else {
    console.log('\nAll checked systems are verified green!');
    process.exit(0);
  }
}

runVerification();
