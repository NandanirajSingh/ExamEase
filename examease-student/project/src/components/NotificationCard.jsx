import React from 'react';
import { Clock, Trash2 } from 'lucide-react';

function NotificationCard({ notification, onDelete }) {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{notification.title}</h3>
          <p className="text-gray-600 mt-1">{notification.message}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center text-gray-500 text-sm">
            <Clock size={14} className="mr-1" />
            {formatTimestamp(notification.timestamp)}
          </div>
          <button
            onClick={() => onDelete(notification.id)}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;