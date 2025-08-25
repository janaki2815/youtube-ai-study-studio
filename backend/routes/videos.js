const express = require('express');
const { body, validationResult } = require('express-validator');
const Video = require('../models/Video');
const auth = require('../middleware/auth');
const { extractVideoId, getVideoMetadata, getVideoInfo } = require('../utils/youtube');

const router = express.Router();

// Get all videos for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const videos = await Video.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(videos);
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new video
router.post('/', [
  auth,
  body('url')
    .isURL()
    .withMessage('Please enter a valid YouTube URL')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { url } = req.body;

    // Extract video ID from URL
    const videoId = extractVideoId(url);
    if (!videoId) {
      return res.status(400).json({ message: 'Invalid YouTube URL' });
    }

    // Check if video already exists for this user
    const existingVideo = await Video.findOne({
      user: req.user._id,
      videoId
    });

    if (existingVideo) {
      return res.status(400).json({ message: 'Video already saved' });
    }

    // Get video metadata
    const metadata = await getVideoMetadata(videoId);
    const videoInfo = await getVideoInfo(videoId);

    // Create new video
    const video = new Video({
      user: req.user._id,
      title: metadata.title,
      description: videoInfo.description,
      thumbnail: metadata.thumbnail,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      videoId,
      channelTitle: metadata.author_name,
      publishedAt: videoInfo.publishedAt,
      viewCount: videoInfo.viewCount
    });

    await video.save();

    res.status(201).json({
      message: 'Video saved successfully',
      video
    });
  } catch (error) {
    console.error('Add video error:', error);
    if (error.message === 'Failed to fetch video metadata') {
      return res.status(400).json({ message: 'Could not fetch video information. Please check the URL.' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific video
router.get('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json(video);
  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a video
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const video = await Video.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id
      },
      {
        title: title || undefined,
        description: description || undefined
      },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json({
      message: 'Video updated successfully',
      video
    });
  } catch (error) {
    console.error('Update video error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a video
router.delete('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
