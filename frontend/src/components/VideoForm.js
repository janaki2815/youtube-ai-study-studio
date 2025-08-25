import React, { useState } from 'react';
import { Link, Plus } from 'lucide-react';

const VideoForm = ({ onAddVideo }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      setLoading(false);
      return;
    }

    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    if (!youtubeRegex.test(url)) {
      setError('Please enter a valid YouTube URL');
      setLoading(false);
      return;
    }

    const result = await onAddVideo({ url: url.trim() });
    
    if (result.success) {
      setSuccess('Video added successfully!');
      setUrl('');
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg text-sm">
          {success}
        </div>
      )}

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-2">
          YouTube Video URL
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="input pl-10"
            disabled={loading}
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Paste any YouTube video URL to save it to your collection
        </p>
      </div>

      <button
        type="submit"
        disabled={loading || !url.trim()}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-soft"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Adding Video...
          </>
        ) : (
          <>
            <Plus className="h-4 w-4 mr-2" />
            Add Video
          </>
        )}
      </button>

      <div className="text-xs text-slate-500 text-center">
        <p>Supported formats:</p>
        <p>• youtube.com/watch?v=...</p>
        <p>• youtu.be/...</p>
        <p>• youtube.com/embed/...</p>
      </div>
    </form>
  );
};

export default VideoForm;
