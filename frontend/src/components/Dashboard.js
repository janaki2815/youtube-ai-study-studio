import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoForm from './VideoForm';
import VideoList from './VideoList';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/videos');
      setVideos(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  const addVideo = async (videoData) => {
    try {
      const response = await axios.post('/api/videos', videoData);
      setVideos([response.data.video, ...videos]);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add video' 
      };
    }
  };

  const deleteVideo = async (videoId) => {
    try {
      await axios.delete(`/api/videos/${videoId}`);
      setVideos(videos.filter(video => video._id !== videoId));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to delete video' 
      };
    }
  };

  const updateVideo = async (videoId, updateData) => {
    try {
      const response = await axios.put(`/api/videos/${videoId}`, updateData);
      setVideos(videos.map(video => 
        video._id === videoId ? response.data.video : video
      ));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update video' 
      };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="animate-spin h-6 w-6 text-primary-600" />
          <span className="text-gray-600">Loading your videos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 animate-fadeUp">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Your Learning Hub
        </h1>
        <p className="text-slate-600">
          Save and organize your favorite YouTube learning videos
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Form */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-8 card-hover">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Add New Video
            </h2>
            <VideoForm onAddVideo={addVideo} />
          </div>
        </div>

        {/* Video List */}
        <div className="lg:col-span-2 animate-fadeUp">
          <VideoList 
            videos={videos}
            onDeleteVideo={deleteVideo}
            onUpdateVideo={updateVideo}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
