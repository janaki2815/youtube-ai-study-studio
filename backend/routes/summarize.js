const express = require('express');
const { body, validationResult } = require('express-validator');
const { exec } = require('child_process');
const { YoutubeTranscript } = require('youtube-transcript');
const router = express.Router();

// Middleware to validate YouTube URL
const validateYouTubeUrl = [
  body('url')
    .notEmpty()
    .withMessage('YouTube URL is required')
    .matches(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/)
    .withMessage('Please provide a valid YouTube URL'),
];

// Extract video ID from YouTube URL
const extractVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// POST /api/summarize
router.post('/', validateYouTubeUrl, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    const { url } = req.body;
    const videoId = extractVideoId(url);
    if (!videoId) {
      return res.status(400).json({ success: false, message: 'Could not extract video ID from URL' });
    }

    // Fetch transcript
    console.log(`Fetching transcript for video: ${videoId}`);
    const transcriptList = await YoutubeTranscript.fetchTranscript(videoId);
    if (!transcriptList || transcriptList.length === 0) {
      return res.status(404).json({ success: false, message: 'No transcript available for this video' });
    }

    const fullTranscript = transcriptList.map(s => s.text).join(' ');
    console.log(`Transcript length: ${fullTranscript.length} characters`);

    const pythonScript = `python "${__dirname}/../summarize.py" "${fullTranscript.replace(/"/g, '\\"')}"`;
    exec(pythonScript, (error, stdout, stderr) => {
      if (error) {
        console.error('Python script error:', error);
        return res.status(500).json({ success: false, message: 'Failed to summarize transcript', error: error.message });
      }
      if (stderr) {
        console.error('Python stderr:', stderr);
      }
      try {
        const result = JSON.parse(stdout);
        if (result.success) {
          return res.json({
            success: true,
            summary: result.summary,
            transcript: fullTranscript,
            videoId,
            stats: {
              originalLength: result.original_length,
              summaryLength: result.summary_length,
              compressionRatio: ((result.original_length - result.summary_length) / result.original_length * 100).toFixed(1)
            }
          });
        }
        return res.status(500).json({ success: false, message: 'Summarization failed', error: result.error });
      } catch (e) {
        console.error('JSON parse error:', e, stdout);
        return res.status(500).json({ success: false, message: 'Failed to parse summarization result' });
      }
    });
  } catch (error) {
    console.error('Summarize route error:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
