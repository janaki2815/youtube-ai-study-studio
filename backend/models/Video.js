const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  videoId: {
    type: String,
    required: true
  },
  channelTitle: {
    type: String,
    trim: true
  },
  publishedAt: {
    type: Date
  },
  duration: {
    type: String
  },
  viewCount: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
videoSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Video', videoSchema);
