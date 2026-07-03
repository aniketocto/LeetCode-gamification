import dotenv from 'dotenv';
import { leetcodeService } from '../services/leetcode/leetcode.service.js';

dotenv.config();

async function test() {
  const username = 'aniket_solves';
  console.log(`Testing LeetCode integration for user: "${username}"...`);

  try {
    console.log('\n--- FETCHING PROFILE ---');
    const profile = await leetcodeService.getProfile(username);
    console.log('Profile Success:', profile);

    console.log('\n--- FETCHING RECENT SUBMISSIONS ---');
    const submissions = await leetcodeService.getRecentSubmissions(username, 5);
    console.log('Recent Submissions Success:', submissions);

    if (submissions.length > 0) {
      const firstSlug = submissions[0].titleSlug;
      console.log(`\n--- FETCHING PROBLEM DETAILS FOR: "${firstSlug}" ---`);
      const details = await leetcodeService.getQuestionDetails(firstSlug);
      console.log('Problem Details Success:', details);
    } else {
      console.log('\nNo submissions found. Cannot test question detail fetch.');
    }

    console.log('\nLeetCode Integration Test Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\nLeetCode Integration Test Failed:', error.message);
    process.exit(1);
  }
}

test();
