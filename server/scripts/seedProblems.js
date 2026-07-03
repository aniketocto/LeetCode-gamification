import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from '../models/Problem.js';
import { calculateXP } from '../utils/progression.js';

dotenv.config();

const SEED_PROBLEMS = [
  { "id": 1, "title": "Two Sum", "difficulty": "Easy", "category": "Array" },
  { "id": 2, "title": "Add Two Numbers", "difficulty": "Medium", "category": "Linked List" },
  { "id": 3, "title": "Longest Substring Without Repeating Characters", "difficulty": "Medium", "category": "String" },
  { "id": 5, "title": "Longest Palindromic Substring", "difficulty": "Medium", "category": "String" },
  { "id": 13, "title": "Roman to Integer", "difficulty": "Easy", "category": "HashMap" },
  { "id": 14, "title": "Longest Common Prefix", "difficulty": "Easy", "category": "String" },
  { "id": 19, "title": "Remove Nth Node From End of List", "difficulty": "Medium", "category": "Linked List" },
  { "id": 20, "title": "Valid Parentheses", "difficulty": "Easy", "category": "String" },
  { "id": 21, "title": "Merge Two Sorted Lists", "difficulty": "Easy", "category": "Recursion" },
  { "id": 23, "title": "Merge k Sorted Lists", "difficulty": "Hard", "category": "Recursion" },
  { "id": 32, "title": "Longest Valid Parentheses", "difficulty": "Hard", "category": "Stack & Queue" },
  { "id": 33, "title": "Search in Rotated Sorted Array", "difficulty": "Medium", "category": "Searching & Sorting" },
  { "id": 34, "title": "Find First and Last Position of Element in Sorted Array", "difficulty": "Medium", "category": "Searching & Sorting" },
  { "id": 35, "title": "Search Insert Position", "difficulty": "Easy", "category": "Searching & Sorting" },
  { "id": 36, "title": "Valid Sudoku", "difficulty": "Medium", "category": "HashMap" },
  { "id": 49, "title": "Group Anagrams", "difficulty": "Medium", "category": "String" },
  { "id": 50, "title": "Pow(x, n)", "difficulty": "Medium", "category": "Recursion" },
  { "id": 53, "title": "Maximum Subarray", "difficulty": "Medium", "category": "Array" },
  { "id": 55, "title": "Jump Game", "difficulty": "Medium", "category": "Array" },
  { "id": 56, "title": "Merge Intervals", "difficulty": "Medium", "category": "Array" },
  { "id": 70, "title": "Climbing Stairs", "difficulty": "Easy", "category": "DP" },
  { "id": 71, "title": "Simplify Path", "difficulty": "Medium", "category": "Stack & Queue" },
  { "id": 75, "title": "Sort Colors", "difficulty": "Medium", "category": "Array" },
  { "id": 76, "title": "Minimum Window Substring", "difficulty": "Hard", "category": "String" },
  { "id": 77, "title": "Combinations", "difficulty": "Medium", "category": "Recursion" },
  { "id": 78, "title": "Subsets", "difficulty": "Medium", "category": "Recursion" },
  { "id": 79, "title": "Word Search", "difficulty": "Medium", "category": "Recursion" },
  { "id": 85, "title": "Maximal Rectangle", "difficulty": "Hard", "category": "Stack & Queue" },
  { "id": 88, "title": "Merge Sorted Array", "difficulty": "Easy", "category": "Array" },
  { "id": 94, "title": "Binary Tree Inorder Traversal", "difficulty": "Easy", "category": "Tree" },
  { "id": 98, "title": "Validate Binary Search Tree", "difficulty": "Medium", "category": "Recursion" },
  { "id": 100, "title": "Same Tree", "difficulty": "Easy", "category": "Tree" },
  { "id": 104, "title": "Maximum Depth of Binary Tree", "difficulty": "Easy", "category": "Recursion" },
  { "id": 105, "title": "Construct Binary Tree from Preorder and Inorder Traversal", "difficulty": "Medium", "category": "Tree" },
  { "id": 110, "title": "Balanced Binary Tree", "difficulty": "Easy", "category": "Recursion" },
  { "id": 121, "title": "Best Time to Buy and Sell Stock", "difficulty": "Easy", "category": "Array" },
  { "id": 125, "title": "Valid Palindrome", "difficulty": "Easy", "category": "String" },
  { "id": 128, "title": "Longest Consecutive Sequence", "difficulty": "Medium", "category": "HashMap" },
  { "id": 133, "title": "Clone Graph", "difficulty": "Medium", "category": "Graph" },
  { "id": 134, "title": "Gas Station", "difficulty": "Medium", "category": "Searching & Sorting" },
  { "id": 138, "title": "Copy List with Random Pointer", "difficulty": "Medium", "category": "Linked List" },
  { "id": 139, "title": "Word Break", "difficulty": "Medium", "category": "DP" },
  { "id": 141, "title": "Linked List Cycle", "difficulty": "Easy", "category": "Linked List" },
  { "id": 144, "title": "Binary Tree Preorder Traversal", "difficulty": "Easy", "category": "Tree" },
  { "id": 148, "title": "Sort List", "difficulty": "Medium", "category": "Linked List" },
  { "id": 150, "title": "Evaluate Reverse Polish Notation", "difficulty": "Medium", "category": "Stack & Queue" },
  { "id": 152, "title": "Maximum Product Subarray", "difficulty": "Medium", "category": "Array" },
  { "id": 155, "title": "Min Stack", "difficulty": "Medium", "category": "Stack & Queue" },
  { "id": 198, "title": "House Robber", "difficulty": "Medium", "category": "DP" },
  { "id": 199, "title": "Binary Tree Right Side View", "difficulty": "Medium", "category": "Tree" },
  { "id": 200, "title": "Number of Islands", "difficulty": "Medium", "category": "Graph" },
  { "id": 202, "title": "Happy Number", "difficulty": "Easy", "category": "HashMap" },
  { "id": 203, "title": "Remove Linked List Elements", "difficulty": "Easy", "category": "Linked List" },
  { "id": 206, "title": "Reverse Linked List", "difficulty": "Easy", "category": "Recursion" },
  { "id": 207, "title": "Course Schedule", "difficulty": "Medium", "category": "Graph" },
  { "id": 210, "title": "Course Schedule II", "difficulty": "Medium", "category": "Graph" },
  { "id": 215, "title": "Kth Largest Element in an Array", "difficulty": "Medium", "category": "Searching & Sorting" },
  { "id": 217, "title": "Contains Duplicate", "difficulty": "Easy", "category": "Array" },
  { "id": 222, "title": "Count Complete Tree Nodes", "difficulty": "Easy", "category": "Tree" },
  { "id": 226, "title": "Invert Binary Tree", "difficulty": "Easy", "category": "Tree" },
  { "id": 234, "title": "Palindrome Linked List", "difficulty": "Easy", "category": "Linked List" },
  { "id": 238, "title": "Product of Array Except Self", "difficulty": "Medium", "category": "Array" },
  { "id": 242, "title": "Valid Anagram", "difficulty": "Easy", "category": "String" },
  { "id": 253, "title": "Meeting Rooms II", "difficulty": "Medium", "category": "Searching & Sorting" },
  { "id": 295, "title": "Find Median from Data Stream", "difficulty": "Hard", "category": "Heap" },
  { "id": 300, "title": "Longest Increasing Subsequence", "difficulty": "Medium", "category": "DP" },
  { "id": 322, "title": "Coin Change", "difficulty": "Medium", "category": "DP" },
  { "id": 323, "title": "Number of Connected Components in an Undirected Graph", "difficulty": "Medium", "category": "Graph" },
  { "id": 347, "title": "Top K Frequent Elements", "difficulty": "Medium", "category": "Heap" },
  { "id": 373, "title": "Find K Pairs with Smallest Sums", "difficulty": "Medium", "category": "Heap" },
  { "id": 378, "title": "Kth Smallest Element in a Sorted Matrix", "difficulty": "Medium", "category": "Heap" },
  { "id": 383, "title": "Ransom Note", "difficulty": "Easy", "category": "HashMap" },
  { "id": 387, "title": "First Unique Character in a String", "difficulty": "Easy", "category": "HashMap" },
  { "id": 416, "title": "Partition Equal Subset Sum", "difficulty": "Medium", "category": "DP" },
  { "id": 417, "title": "Pacific Atlantic Water Flow", "difficulty": "Medium", "category": "Graph" },
  { "id": 424, "title": "Longest Repeating Character Replacement", "difficulty": "Medium", "category": "String" },
  { "id": 435, "title": "Non-overlapping Intervals", "difficulty": "Medium", "category": "Searching & Sorting" },
  { "id": 496, "title": "Next Greater Element I", "difficulty": "Easy", "category": "Stack & Queue" },
  { "id": 518, "title": "Coin Change 2", "difficulty": "Medium", "category": "DP" },
  { "id": 543, "title": "Diameter of Binary Tree", "difficulty": "Easy", "category": "Tree" },
  { "id": 547, "title": "Number of Provinces", "difficulty": "Medium", "category": "Graph" },
  { "id": 567, "title": "Permutation in String", "difficulty": "Medium", "category": "String" },
  { "id": 621, "title": "Task Scheduler", "difficulty": "Medium", "category": "Heap" },
  { "id": 641, "title": "Design Circular Deque", "difficulty": "Medium", "category": "Stack & Queue" },
  { "id": 692, "title": "Top K Frequent Words", "difficulty": "Medium", "category": "HashMap" },
  { "id": 695, "title": "Max Area of Island", "difficulty": "Medium", "category": "Graph" },
  { "id": 704, "title": "Binary Search", "difficulty": "Easy", "category": "Searching & Sorting" },
  { "id": 739, "title": "Daily Temperatures", "difficulty": "Medium", "category": "Stack & Queue" },
  { "id": 767, "title": "Reorganize String", "difficulty": "Medium", "category": "Heap" },
  { "id": 785, "title": "Is Graph Bipartite?", "difficulty": "Medium", "category": "Graph" },
  { "id": 881, "title": "Boats to Save People", "difficulty": "Medium", "category": "Searching & Sorting" },
  { "id": 946, "title": "Validate Stack Sequences", "difficulty": "Medium", "category": "Stack & Queue" },
  { "id": 973, "title": "K Closest Points to Origin", "difficulty": "Easy", "category": "Heap" },
  { "id": 994, "title": "Rotting Oranges", "difficulty": "Medium", "category": "Graph" },
  { "id": 1143, "title": "Longest Common Subsequence", "difficulty": "Medium", "category": "DP" }
];

// Helper to convert title to slug
function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove special characters
    .replace(/[\s_]+/g, '-')  // replace spaces/underscores with -
    .replace(/-+/g, '-');      // remove extra hyphens
}

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in .env');
    }

    console.log('Connecting to database...');
    await mongoose.connect(mongoUri);
    console.log('Database connected.');

    // Optional: Clear existing problems (with user safety)
    console.log('Clearing existing Problems...');
    await Problem.deleteMany({});

    console.log('Seeding problems...');
    const problemsToInsert = SEED_PROBLEMS.map(p => {
      const slug = slugify(p.title);
      const xpValues = calculateXP(p.difficulty, null);

      return {
        leetcodeId: p.id,
        frontendQuestionId: String(p.id),
        title: p.title,
        titleSlug: slug,
        difficulty: p.difficulty,
        category: p.category,
        xp: {
          baseXP: xpValues.baseXP,
          complexityBonus: 0,
          finalXP: xpValues.finalXP,
          scoringVersion: 1
        }
      };
    });

    await Problem.insertMany(problemsToInsert);
    console.log(`Successfully seeded ${problemsToInsert.length} problems!`);

    await mongoose.disconnect();
    console.log('Database disconnected.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
}

seed();
