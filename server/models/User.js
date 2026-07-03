import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  leetcode: {
    username: {
      type: String,
      default: null,
      trim: true
    },
    connectedAt: {
      type: Date,
      default: null
    },
    lastSyncedAt: {
      type: Date,
      default: null
    }
  },
  progression: {
    totalXP: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Indexes
UserSchema.index({ 'leetcode.username': 1 }, { sparse: true });

const User = mongoose.model('User', UserSchema);
export default User;
