/**
 * Calculates current level details based on total XP using the quadratic progression.
 * CumXP(L) = 10 * (L^2 + 2L - 3)
 */
export function getLevelInfo(totalXP) {
  // L = Math.floor(-1 + Math.sqrt(4 + totalXP / 10))
  const derivedLevel = Math.floor(-1 + Math.sqrt(4 + totalXP / 10));
  const currentLevel = Math.max(1, derivedLevel);
  
  // Cumulative XP marks
  const xpForCurrentLevel = 10 * (currentLevel * currentLevel + 2 * currentLevel - 3);
  const nextLevel = currentLevel + 1;
  const xpForNextLevel = 10 * (nextLevel * nextLevel + 2 * nextLevel - 3);
  
  const xpRequiredForNextLevel = xpForNextLevel - xpForCurrentLevel;
  const xpEarnedInLevel = totalXP - xpForCurrentLevel;
  const percent = Math.min(100, Math.max(0, (xpEarnedInLevel / xpRequiredForNextLevel) * 100));
  
  return {
    level: currentLevel,
    xpEarnedInLevel,
    xpRequiredForNextLevel,
    percent: Math.round(percent * 100) / 100 // format to 2 decimal places
  };
}

/**
 * Derives player rank name based on level
 */
export function getPlayerRank(level) {
  if (level <= 2) return "ROOKIE CODER";
  if (level <= 4) return "BUG CATCHER";
  if (level <= 7) return "CODE TRAINER";
  if (level <= 10) return "ALGORITHM SCOUT";
  if (level <= 14) return "STACK WARRIOR";
  if (level <= 19) return "CODE ACE";
  return "ALGORITHM MASTER";
}

/**
 * Calculates XP value based on difficulty and optional Groq complexity analysis
 */
export function calculateXP(difficulty, aiAnalysis = null) {
  let baseXP = 25;
  let minXP = 25;
  let maxXP = 45;

  if (difficulty === 'Medium') {
    baseXP = 60;
    minXP = 60;
    maxXP = 95;
  } else if (difficulty === 'Hard') {
    baseXP = 120;
    minXP = 120;
    maxXP = 180;
  }

  if (!aiAnalysis) {
    return { baseXP, complexityBonus: 0, finalXP: baseXP };
  }

  const {
    implementationComplexity = 1,
    conceptualDifficulty = 1,
    edgeCaseComplexity = 1,
    reasoningDepth = 1
  } = aiAnalysis;

  // Complexity formula: Round(((impl * 1.0) + (concept * 1.5) + (edge * 1.0) + (reason * 1.5)) / 5) * 5
  // Max possible: impl=10, concept=10, edge=10, reason=10 -> ((10) + (15) + (10) + (15)) / 5 = 10 * 5 = 50. Let's clamp the bonus.
  const rawBonus = ((implementationComplexity * 1.0) + (conceptualDifficulty * 1.5) + (edgeCaseComplexity * 1.0) + (reasoningDepth * 1.5));
  const complexityBonus = Math.round(rawBonus / 5) * 5;

  let finalXP = baseXP + complexityBonus;
  // Clamp final XP
  if (finalXP < minXP) finalXP = minXP;
  if (finalXP > maxXP) finalXP = maxXP;

  return {
    baseXP,
    complexityBonus: finalXP - baseXP,
    finalXP
  };
}
