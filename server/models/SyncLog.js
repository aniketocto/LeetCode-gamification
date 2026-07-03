import mongoose from 'mongoose';

const SyncLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['SUCCESS', 'FAILED'],
    required: true
  },
  problemsSyncedCount: {
    type: Number,
    default: 0
  },
  xpGained: {
    type: Number,
    default: 0
  },
  error: {
    type: String,
    default: null
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

SyncLogSchema.index({ userId: 1, createdAt: -1 });

const SyncLog = mongoose.model('SyncLog', SyncLogSchema);
export default SyncLog;
