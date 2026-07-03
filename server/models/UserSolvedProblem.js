import mongoose from 'mongoose';

const UserSolvedProblemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  titleSlug: {
    type: String,
    required: true
  },
  solvedAt: {
    type: Date,
    required: true
  },
  firstDetectedAt: {
    type: Date,
    default: Date.now
  },
  xpAwarded: {
    type: Number,
    required: true
  },
  scoringVersion: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Idempotency constraint: one record per user + problem slug
UserSolvedProblemSchema.index({ userId: 1, titleSlug: 1 }, { unique: true });
UserSolvedProblemSchema.index({ userId: 1 });
UserSolvedProblemSchema.index({ problemId: 1 });

const UserSolvedProblem = mongoose.model('UserSolvedProblem', UserSolvedProblemSchema);
export default UserSolvedProblem;
