import fetch from 'node-fetch'; // if not native, but let's use global fetch (Node 18+)

const BASE_URL = 'https://leet-code-gamification.vercel.app/api';

async function runEndpointTests() {
  console.log('=== API ENDPOINTS INTEGRATION TESTING ===\n');

  const timestamp = Date.now();
  const testUser = {
    email: `test_${timestamp}@example.com`,
    username: `test_user_${timestamp}`,
    password: 'password123'
  };

  let token = null;

  // Helper to print test result
  function printResult(name, passed, detail = '') {
    if (passed) {
      console.log(`✓ ${name}: PASS`);
    } else {
      console.log(`✗ ${name}: FAIL - ${detail}`);
    }
  }

  // Helper to check standard error response structure (no stack trace, clean JSON)
  function isValidErrorResponse(res, data, expectedStatus) {
    if (res.status !== expectedStatus) return false;
    if (data.success !== false) return false;
    if (!data.message) return false;
    // Ensure no stack traces leak
    if (data.stack || JSON.stringify(data).includes('mongoose') || JSON.stringify(data).includes('ValidationError') || JSON.stringify(data).includes('CastError')) {
      return false;
    }
    return true;
  }

  // 1. POST /auth/register - Success
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    const data = await res.json();
    
    const isSuccess = res.status === 201 && data.success === true && !!data.token && data.user.email === testUser.email;
    if (isSuccess) token = data.token;
    printResult('POST /auth/register - Success', isSuccess, `Status: ${res.status}`);
  } catch (err) {
    printResult('POST /auth/register - Success', false, err.message);
  }

  // 2. POST /auth/register - Duplicate Input
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    const data = await res.json();
    const isCorrectErr = isValidErrorResponse(res, data, 400);
    printResult('POST /auth/register - Duplicate Input', isCorrectErr, `Status: ${res.status}, Msg: ${data.message}`);
  } catch (err) {
    printResult('POST /auth/register - Duplicate Input', false, err.message);
  }

  // 3. POST /auth/register - Missing Input
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testUser.email }) // missing username and password
    });
    const data = await res.json();
    const isCorrectErr = isValidErrorResponse(res, data, 400);
    printResult('POST /auth/register - Missing Input', isCorrectErr, `Status: ${res.status}`);
  } catch (err) {
    printResult('POST /auth/register - Missing Input', false, err.message);
  }

  // 4. POST /auth/login - Success
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testUser.email, password: testUser.password })
    });
    const data = await res.json();
    const isSuccess = res.status === 200 && data.success === true && !!data.token && !!data.user;
    printResult('POST /auth/login - Success', isSuccess, `Status: ${res.status}`);
  } catch (err) {
    printResult('POST /auth/login - Success', false, err.message);
  }

  // 5. POST /auth/login - Invalid Password
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testUser.email, password: 'wrong_password' })
    });
    const data = await res.json();
    const isCorrectErr = isValidErrorResponse(res, data, 401);
    printResult('POST /auth/login - Invalid Password', isCorrectErr, `Status: ${res.status}`);
  } catch (err) {
    printResult('POST /auth/login - Invalid Password', false, err.message);
  }

  // 6. GET /auth/me - Success (With Valid JWT Token)
  try {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    const isSuccess = res.status === 200 && data.success === true && data.user.email === testUser.email;
    printResult('GET /auth/me - Success', isSuccess, `Status: ${res.status}`);
  } catch (err) {
    printResult('GET /auth/me - Success', false, err.message);
  }

  // 7. GET /auth/me - Unauthorized (Missing Token)
  try {
    const res = await fetch(`${BASE_URL}/auth/me`);
    const data = await res.json();
    const isCorrectErr = isValidErrorResponse(res, data, 401);
    printResult('GET /auth/me - Unauthorized', isCorrectErr, `Status: ${res.status}`);
  } catch (err) {
    printResult('GET /auth/me - Unauthorized', false, err.message);
  }

  // 8. POST /leetcode/connect - Missing Input
  try {
    const res = await fetch(`${BASE_URL}/leetcode/connect`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({}) // empty
    });
    const data = await res.json();
    const isCorrectErr = isValidErrorResponse(res, data, 400);
    printResult('POST /leetcode/connect - Missing Input', isCorrectErr, `Status: ${res.status}`);
  } catch (err) {
    printResult('POST /leetcode/connect - Missing Input', false, err.message);
  }

  // 9. POST /leetcode/connect - Invalid LeetCode Profile
  try {
    const res = await fetch(`${BASE_URL}/leetcode/connect`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ leetcodeUsername: 'non_existent_user_129846123' })
    });
    const data = await res.json();
    const isCorrectErr = isValidErrorResponse(res, data, 400);
    printResult('POST /leetcode/connect - Invalid Profile', isCorrectErr, `Status: ${res.status}, Msg: ${data.message}`);
  } catch (err) {
    printResult('POST /leetcode/connect - Invalid Profile', false, err.message);
  }

  // 10. POST /leetcode/connect - Success
  try {
    const res = await fetch(`${BASE_URL}/leetcode/connect`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ leetcodeUsername: 'aniket_solves' })
    });
    const data = await res.json();
    const isSuccess = res.status === 200 && data.success === true && data.leetcodeUsername === 'aniket_solves';
    printResult('POST /leetcode/connect - Success', isSuccess, `Status: ${res.status}`);
  } catch (err) {
    printResult('POST /leetcode/connect - Success', false, err.message);
  }

  // 11. POST /leetcode/sync - Success
  try {
    const res = await fetch(`${BASE_URL}/leetcode/sync`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    const isSuccess = res.status === 200 && data.success === true && typeof data.xpGained === 'number' && Array.isArray(data.syncedProblems);
    printResult('POST /leetcode/sync - Success', isSuccess, `Status: ${res.status}`);
  } catch (err) {
    printResult('POST /leetcode/sync - Success', false, err.message);
  }

  // 12. GET /problems - Success
  try {
    const res = await fetch(`${BASE_URL}/problems`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    const isSuccess = res.status === 200 && data.success === true && Array.isArray(data.problems) && data.problems.length > 0;
    printResult('GET /problems - Success', isSuccess, `Status: ${res.status}, Count: ${data.problems?.length}`);
  } catch (err) {
    printResult('GET /problems - Success', false, err.message);
  }

  // 13. GET /problems - Filter Query Check
  try {
    const res = await fetch(`${BASE_URL}/problems?difficulty=Easy&status=COMPLETED`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    const isSuccess = res.status === 200 && data.success === true && Array.isArray(data.problems);
    // Double check all returned fit difficulty and status
    const allEasyAndCompleted = data.problems.every(p => p.difficulty === 'Easy' && p.isCompleted === true);
    printResult('GET /problems - Query Filters', isSuccess && allEasyAndCompleted, `Status: ${res.status}, Count: ${data.problems?.length}, FilterMatch: ${allEasyAndCompleted}`);
  } catch (err) {
    printResult('GET /problems - Query Filters', false, err.message);
  }

  // 14. GET /progression - Success
  try {
    const res = await fetch(`${BASE_URL}/progression`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    const isSuccess = res.status === 200 && data.success === true && typeof data.progression?.totalXP === 'number' && typeof data.progression?.level === 'number' && !!data.progression?.rank;
    printResult('GET /progression - Success', isSuccess, `Status: ${res.status}, LVL: ${data.progression?.level}, Rank: ${data.progression?.rank}`);
  } catch (err) {
    printResult('GET /progression - Success', false, err.message);
  }

  // 14.5 GET /progression/solved - Success
  try {
    const res = await fetch(`${BASE_URL}/progression/solved`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    const isSuccess = res.status === 200 && data.success === true && Array.isArray(data.quests);
    printResult('GET /progression/solved - Success', isSuccess, `Status: ${res.status}, Solved Quests: ${data.count}`);
  } catch (err) {
    printResult('GET /progression/solved - Success', false, err.message);
  }

  // 15. POST /progression/reset - Success
  try {
    const res = await fetch(`${BASE_URL}/progression/reset`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    const isSuccess = res.status === 200 && data.success === true && data.message.includes('scrubbed');
    printResult('POST /progression/reset - Success', isSuccess, `Status: ${res.status}`);
  } catch (err) {
    printResult('POST /progression/reset - Success', false, err.message);
  }

  console.log('\n=== API ENDPOINTS INTEGRATION TESTING COMPLETED ===');
}

runEndpointTests();
