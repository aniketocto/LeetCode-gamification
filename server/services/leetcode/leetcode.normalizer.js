/**
 * Normalizes LeetCode GraphQL response data to prevent system crashes 
 * when upstream schemas or structures change.
 */

export function normalizeProfile(data) {
  if (!data?.matchedUser) {
    throw new Error('LeetCode user profile not found or is private.');
  }

  const matchedUser = data.matchedUser;
  const stats = matchedUser.submitStats?.acSubmissionNum || [];

  const profileStats = {
    username: matchedUser.username,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    totalSolved: 0
  };

  stats.forEach(item => {
    const count = Number(item.count || 0);
    if (item.difficulty === 'All') profileStats.totalSolved = count;
    else if (item.difficulty === 'Easy') profileStats.easySolved = count;
    else if (item.difficulty === 'Medium') profileStats.mediumSolved = count;
    else if (item.difficulty === 'Hard') profileStats.hardSolved = count;
  });

  return profileStats;
}

export function normalizeSubmissions(data) {
  const submissions = data?.recentAcSubmissionList || [];
  return submissions.map(sub => ({
    submissionId: sub.id,
    title: sub.title || 'Unknown Title',
    titleSlug: sub.titleSlug,
    timestamp: new Date(Number(sub.timestamp || 0) * 1000)
  })).filter(sub => !!sub.titleSlug);
}

export function normalizeQuestion(data) {
  const question = data?.question;
  if (!question) {
    throw new Error('Problem details could not be retrieved from LeetCode.');
  }

  // Get primary category/topic name
  let category = 'Algorithms';
  if (question.topicTags && question.topicTags.length > 0) {
    category = question.topicTags[0].name;
  }

  return {
    leetcodeId: Number(question.questionId || 0),
    frontendQuestionId: question.questionFrontendId || '0',
    title: question.title || 'Untitled',
    titleSlug: question.titleSlug,
    difficulty: question.difficulty || 'Easy',
    category,
    topics: (question.topicTags || []).map(t => t.name)
  };
}
