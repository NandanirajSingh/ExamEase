import React, { useState } from 'react';
import { X } from 'lucide-react';

function ComposeNotification({ onClose, onSubmit }) {
  const [notification, setNotification] = useState({
    title: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...notification,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      unread: true,
    });
    onClose();
  };

  return (
    <div className="fixed bottom-0 right-8 w-[400px] bg-white rounded-t-lg shadow-xl border border-gray-200 z-50">
      <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-t-lg">
        <h3 className="font-medium text-gray-700">New Notification</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Notification Title"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={notification.title}
            onChange={(e) => setNotification({ ...notification, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Write your message here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={notification.message}
            onChange={(e) => setNotification({ ...notification, message: e.target.value })}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-[#122064] text-white rounded-lg hover:bg-[#1a2d8a] transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ComposeNotification;