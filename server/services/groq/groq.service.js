import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GROQ_API_KEY;
let groq = null;

if (apiKey) {
  try {
    groq = new Groq({ apiKey });
  } catch (error) {
    console.error('Failed to initialize Groq SDK:', error.message);
  }
} else {
  console.warn('GROQ_API_KEY is not defined in the environment. AI complexity analysis is disabled.');
}

export const groqService = {
  /**
   * Analyzes a problem's title, difficulty, and category to determine complexity parameters.
   * Returns: { implementationComplexity, conceptualDifficulty, edgeCaseComplexity, reasoningDepth }
   */
  async analyzeProblemComplexity(title, difficulty, category) {
    if (!groq) {
      console.warn('Groq SDK not initialized. Skipping AI evaluation.');
      return null;
    }

    try {
      const prompt = `
        You are a senior algorithms evaluator. Evaluate the LeetCode problem details below:
        Title: "${title}"
        Difficulty: "${difficulty}"
        Category: "${category}"

        Provide rating scores between 1 (easiest) and 10 (hardest) for:
        1. implementationComplexity: How difficult it is to write the code (e.g. state management, data structures required, code length, modularity).
        2. conceptualDifficulty: How hard the core algorithm idea is to understand or discover (e.g. dynamic programming transitions, mathematical proofs).
        3. edgeCaseComplexity: How likely or tricky the edge cases are (e.g. integer overflow, empty inputs, duplicate elements).
        4. reasoningDepth: How deep the logical thinking or problem-solving reasoning is (e.g. optimization steps, reducing O(N^2) to O(N)).

        Respond strictly in JSON format. Do not write any markdown wrappers, code blocks, or conversational text.
        JSON format:
        {
          "implementationComplexity": number,
          "conceptualDifficulty": number,
          "edgeCaseComplexity": number,
          "reasoningDepth": number
        }
      `;

      const response = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that only replies with structured JSON objects.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        model: 'llama-3.1-8b-instant',
        response_format: { type: 'json_object' },
        temperature: 0.1,
        max_tokens: 200
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('Groq returned empty response');
      }

      const parsed = JSON.parse(content);
      
      // Validate bounds and shape
      const validateRating = (val) => {
        const num = Math.round(Number(val));
        return isNaN(num) ? 5 : Math.max(1, Math.min(10, num));
      };

      return {
        implementationComplexity: validateRating(parsed.implementationComplexity),
        conceptualDifficulty: validateRating(parsed.conceptualDifficulty),
        edgeCaseComplexity: validateRating(parsed.edgeCaseComplexity),
        reasoningDepth: validateRating(parsed.reasoningDepth),
        modelUsed: 'llama-3.1-8b-instant',
        analyzedAt: new Date()
      };
    } catch (error) {
      console.error(`AI Analysis failed for problem "${title}":`, error.message);
      return null; // Graceful degradation
    }
  }
};
