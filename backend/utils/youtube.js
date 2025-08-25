const axios = require('axios');

// Extract video ID from YouTube URL
const extractVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Get video metadata using oEmbed API (no API key required)
const getVideoMetadata = async (videoId) => {
  try {
    const response = await axios.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    
    return {
      title: response.data.title,
      thumbnail: response.data.thumbnail_url,
      author_name: response.data.author_name,
      author_url: response.data.author_url
    };
  } catch (error) {
    console.error('Error fetching video metadata:', error);
    throw new Error('Failed to fetch video metadata');
  }
};

// Get additional video info from YouTube page
const getVideoInfo = async (videoId) => {
  try {
    const response = await axios.get(`https://www.youtube.com/watch?v=${videoId}`);
    const html = response.data;
    
    // Extract description (basic approach)
    const descriptionMatch = html.match(/"shortDescription":"([^"]+)"/);
    const description = descriptionMatch ? descriptionMatch[1].replace(/\\n/g, '\n') : '';
    
    // Extract view count
    const viewCountMatch = html.match(/"viewCount":"(\d+)"/);
    const viewCount = viewCountMatch ? parseInt(viewCountMatch[1]) : 0;
    
    // Extract publish date
    const publishDateMatch = html.match(/"publishDate":"([^"]+)"/);
    const publishedAt = publishDateMatch ? new Date(publishDateMatch[1]) : null;
    
    return {
      description,
      viewCount,
      publishedAt
    };
  } catch (error) {
    console.error('Error fetching video info:', error);
    return {
      description: '',
      viewCount: 0,
      publishedAt: null
    };
  }
};

module.exports = {
  extractVideoId,
  getVideoMetadata,
  getVideoInfo
};
