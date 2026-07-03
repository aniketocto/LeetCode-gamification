import { RECENT_SUBMISSIONS_QUERY, USER_PROFILE_QUERY, QUESTION_DETAILS_QUERY } from './leetcode.queries.js';
import { normalizeProfile, normalizeSubmissions, normalizeQuestion } from './leetcode.normalizer.js';

const LEETCODE_GQL_URL = 'https://leetcode.com/graphql';

/**
 * Helper to make GraphQL requests to LeetCode
 */
async function fetchFromLeetCode(query, variables = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(LEETCODE_GQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://leetcode.com'
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    if (result.errors && result.errors.length > 0) {
      throw new Error(result.errors[0].message || 'GraphQL Error');
    }

    return result.data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('LeetCode API timeout. Connection timed out.');
    }
    throw error;
  }
}

/**
 * Service methods to fetch public LeetCode data
 */
export const leetcodeService = {
  /**
   * Fetches public profile stats for a LeetCode user
   */
  async getProfile(username) {
    if (!username) throw new Error('LeetCode username is required.');
    const data = await fetchFromLeetCode(USER_PROFILE_QUERY, { username });
    return normalizeProfile(data);
  },

  /**
   * Fetches recent accepted submissions for a user
   */
  async getRecentSubmissions(username, limit = 20) {
    if (!username) throw new Error('LeetCode username is required.');
    const data = await fetchFromLeetCode(RECENT_SUBMISSIONS_QUERY, { username, limit });
    return normalizeSubmissions(data);
  },

  /**
   * Fetches full metadata for a specific problem by slug
   */
  async getQuestionDetails(titleSlug) {
    if (!titleSlug) throw new Error('LeetCode problem titleSlug is required.');
    const data = await fetchFromLeetCode(QUESTION_DETAILS_QUERY, { titleSlug });
    return normalizeQuestion(data);
  }
};
