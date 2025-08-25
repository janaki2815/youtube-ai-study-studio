import React, { useState } from 'react';
import VideoCard from './VideoCard';
import { Play, FolderOpen } from 'lucide-react';

const VideoList = ({ videos, onDeleteVideo, onUpdateVideo }) => {
  const [editingId, setEditingId] = useState(null);

  if (videos.length === 0) {
    return (
      <div className="card p-8 text-center">
        <FolderOpen className="mx-auto h-12 w-12 text-primary-400 mb-4 animate-float" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          No videos yet
        </h3>
        <p className="text-slate-600 mb-4">
          Start building your learning collection by adding your first YouTube video.
        </p>
        <div className="inline-flex items-center text-sm text-slate-500">
          <Play className="h-4 w-4 mr-1" />
          <span>Add a video to get started</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          Your Videos ({videos.length})
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {videos.map((video) => (
          <div key={video._id} className="animate-fadeUp">
            <VideoCard
              video={video}
              isEditing={editingId === video._id}
              onEdit={() => setEditingId(video._id)}
              onCancelEdit={() => setEditingId(null)}
              onSaveEdit={async (updateData) => {
                const result = await onUpdateVideo(video._id, updateData);
                if (result.success) {
                  setEditingId(null);
                }
                return result;
              }}
              onDelete={async () => {
                const result = await onDeleteVideo(video._id);
                return result;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
