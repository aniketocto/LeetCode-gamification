import mongoose from 'mongoose';

const ProblemSchema = new mongoose.Schema({
  leetcodeId: {
    type: Number,
    required: true
  },
  frontendQuestionId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  titleSlug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  xp: {
    baseXP: {
      type: Number,
      required: true
    },
    complexityBonus: {
      type: Number,
      default: 0
    },
    finalXP: {
      type: Number,
      required: true
    },
    scoringVersion: {
      type: Number,
      default: 1
    }
  },
  aiAnalysis: {
    implementationComplexity: {
      type: Number,
      min: 1,
      max: 10
    },
    conceptualDifficulty: {
      type: Number,
      min: 1,
      max: 10
    },
    edgeCaseComplexity: {
      type: Number,
      min: 1,
      max: 10
    },
    reasoningDepth: {
      type: Number,
      min: 1,
      max: 10
    },
    analyzedAt: {
      type: Date
    },
    modelUsed: {
      type: String
    }
  }
}, {
  timestamps: true
});

ProblemSchema.index({ difficulty: 1 });
ProblemSchema.index({ category: 1 });

const Problem = mongoose.model('Problem', ProblemSchema);
export default Problem;
