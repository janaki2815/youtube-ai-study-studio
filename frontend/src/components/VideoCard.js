import React, { useState } from 'react';
import { ExternalLink, Edit, Trash2, Save, X, Eye, Calendar, User } from 'lucide-react';

const VideoCard = ({ 
  video, 
  isEditing, 
  onEdit, 
  onCancelEdit, 
  onSaveEdit, 
  onDelete 
}) => {
  const [editData, setEditData] = useState({
    title: video.title,
    description: video.description || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setLoading(true);
    setError('');
    
    const result = await onSaveEdit(editData);
    
    if (!result.success) {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      setLoading(true);
      const result = await onDelete();
      if (!result.success) {
        setError(result.message);
      }
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatViewCount = (count) => {
    if (!count) return 'N/A';
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="card overflow-hidden card-hover">
      {/* Thumbnail */}
      <div className="relative group">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x225?text=Video+Thumbnail';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/90 rounded-full p-2 shadow-soft hover:scale-105"
          >
            <ExternalLink className="h-5 w-5 text-slate-700" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {isEditing ? (
          // Edit Mode
          <div className="space-y-3">
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
                className="input text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({...editData, description: e.target.value})}
                rows="3"
                className="textarea text-sm"
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                disabled={loading}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </button>
              <button
                onClick={onCancelEdit}
                disabled={loading}
                className="btn-ghost flex-1 bg-gray-100"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          // View Mode
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 line-clamp-2 mb-2">
                {video.title}
              </h3>
              {video.description && (
                <p className="text-slate-600 text-sm line-clamp-3 mb-3">
                  {video.description}
                </p>
              )}
            </div>

            {/* Video Info */}
            <div className="grid grid-cols-3 gap-2 text-sm text-slate-600">
              {video.channelTitle && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-primary-600" />
                  <span className="truncate">{video.channelTitle}</span>
                </div>
              )}
              
              {video.publishedAt && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary-600" />
                  <span className="truncate">{formatDate(video.publishedAt)}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-2 text-primary-600" />
                <span className="truncate">{formatViewCount(video.viewCount)} views</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2 pt-2 border-t border-slate-100">
              <button
                onClick={onEdit}
                className="btn-ghost flex-1"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors duration-200 flex-1"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
