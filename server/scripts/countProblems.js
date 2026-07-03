import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from '../models/Problem.js';
import User from '../models/User.js';
import UserSolvedProblem from '../models/UserSolvedProblem.js';

dotenv.config();

async function checkCounts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected.');

    const problemCount = await Problem.countDocuments({});
    const userCount = await User.countDocuments({});
    const solvedCount = await UserSolvedProblem.countDocuments({});

    console.log('\n--- MongoDB Collection Counts ---');
    console.log(`Problem count:           ${problemCount}`);
    console.log(`User count:              ${userCount}`);
    console.log(`UserSolvedProblem count: ${solvedCount}`);

    // Let's print unique solved slugs for the test user if any
    const testUser = await User.findOne({ 'leetcode.username': 'aniket_solves' });
    if (testUser) {
      console.log(`\nTest User found: ${testUser.username}`);
      const userSolved = await UserSolvedProblem.find({ userId: testUser._id });
      console.log(`UserSolvedProblem for test user count: ${userSolved.length}`);
      userSolved.forEach((sp, idx) => {
        console.log(`  [${idx+1}] Slug: ${sp.titleSlug}, XP: ${sp.xpAwarded}`);
      });
    } else {
      console.log('\nTest user "aniket_solves" not found in DB.');
    }

    await mongoose.disconnect();
    console.log('\nDatabase disconnected.');
    process.exit(0);
  } catch (err) {
    console.error('Count check failed:', err.message);
    process.exit(1);
  }
}

checkCounts();
