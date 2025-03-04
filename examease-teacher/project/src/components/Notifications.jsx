import React, { useState } from 'react';
import {
  Home,
  LayoutDashboard,
  FileEdit,
  LineChart,
  Bell,
  Settings,
  Menu,
  Clock,
  AlertTriangle,
  FileText,
  Trash2,
  Check,
  Plus,
  X,
  Inbox
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

function Notifications({ notifications, setNotifications, darkMode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Create Exam', path: '/create-exam', icon: FileEdit },
    { label: 'Results', path: '/results', icon: LineChart },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];
  
  const getIcon = (type) => {
    switch (type) {
      case 'exam':
        return <Bell className="text-blue-500" />;
      case 'result':
        return <FileText className="text-green-500" />;
      case 'system':
        return <AlertTriangle className="text-orange-500" />;
      case 'message':
        return <FileText className="text-purple-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      unread: false
    })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, unread: false } : notification
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const addNotification = (newNotification) => {
    setNotifications([
      {
        ...newNotification,
        id: Date.now(),
        timestamp: 'Just now',
        unread: true
      },
      ...notifications
    ]);
    setShowCompose(false);
  };

  // Optimized navigation function to improve performance
  const handleNavigation = (path) => {
    // Add a small visual feedback before navigation
    document.body.style.opacity = '0.9';
    setTimeout(() => {
      navigate(path);
      document.body.style.opacity = '1';
    }, 50);
  };

  return (
   <div className="flex min-h-screen bg-[#ECF9FF] dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed h-full transition-all duration-300 z-20`}>
        <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-[#122064] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
            <Menu size={24} />
          </button>
          {!isCollapsed && <span className="text-xl font-bold text-[#122064] dark:text-white">ExamEase</span>}
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-3 p-3 text-[#122064] dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left ${
                    location.pathname === item.path ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <item.icon size={20} className="text-[#122064] dark:text-white" />
                  {!isCollapsed && <span className="text-[#122064] dark:text-white">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>


      {/* Main Content */}
      <main className={`${isCollapsed ? 'ml-20' : 'ml-64'} flex-1 flex flex-col min-h-screen transition-all duration-300`}>
        {/* Header */}
        <header className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed ${isCollapsed ? 'w-[calc(100%-5rem)]' : 'w-[calc(100%-16rem)]'} z-10 transition-all duration-300`}>
          <div className="flex justify-between items-center px-10 py-5">
            <h1 className="text-2xl font-bold text-[#122064] dark:text-white">Notifications</h1>
            {notifications.length === 0 ? null : (
              <button
                onClick={() => setShowCompose(true)}
                className="flex items-center gap-2 px-4 py-1 bg-[#122064] dark:bg-blue-600 text-white rounded-lg hover:bg-[#1a2d8a] dark:hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                Create notification
              </button>
            )}
          </div>
        </header>

        {/* Notification Content */}
        <div className="pt-20 p-8 flex-grow">
          {notifications.length > 0 ? (
            <>
              {/* Notification Actions */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {notifications.filter(n => n.unread).length} unread notifications
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <Check size={16} />
                    Mark all as read
                  </button>
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <Trash2 size={16} />
                    Clear all
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border ${
                      notification.unread ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-sm">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className={`font-semibold ${notification.unread ? 'text-[#122064] dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                              {notification.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                            <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                              <p>From: {notification.from}</p>
                              <p>To: {notification.to}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center text-gray-500 dark:text-gray-500 text-sm">
                              <Clock size={14} className="mr-1" />
                              {notification.timestamp}
                            </div>
                            <div className="flex items-center gap-2">
                              {notification.unread && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                >
                                  <Check size={16} />
                                </button>
                              )}
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full mb-4">
                <Inbox size={48} className="text-gray-400 dark:text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No notifications yet</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Create a new notification to get started</p>
              <button
                onClick={() => setShowCompose(true)}
                className="flex items-center gap-2 px-6 py-3 bg-[#122064] dark:bg-blue-600 text-white rounded-lg hover:bg-[#1a2d8a] dark:hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                Create notification
              </button>
            </div>
          )}
        </div>

      </main>

      {/* Compose Notification Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-[700px] shadow-2xl">
            <div className="flex items-center justify-between bg-[#122064] dark:bg-blue-600 px-8 py-6 rounded-t-xl">
              <h3 className="text-xl font-semibold text-white">New Notification</h3>
              <button onClick={() => setShowCompose(false)} className="text-white/80 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              addNotification({
                type: formData.get('type'),
                title: formData.get('title'),
                message: formData.get('message'),
                from: formData.get('from'),
                to: formData.get('to')
              });
            }} className="p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#122064] dark:text-white mb-2">Type</label>
                  <select
                    name="type"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="exam">Exam Alert</option>
                    <option value="result">Result Notification</option>
                    <option value="system">System Update</option>
                    <option value="message">Message</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#122064] dark:text-white mb-2">From</label>
                  <input
                    type="text"
                    name="from"
                    placeholder="Sender's name or department"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#122064] dark:text-white mb-2">To</label>
                  <input
                    type="text"
                    name="to"
                    placeholder="Recipients"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#122064] dark:text-white mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Notification title"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#122064] dark:text-white mb-2">Message</label>
                  <textarea
                    name="message"
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl h-40 resize-none focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end mt-8 gap-3">
                <button
                  type="button"
                  onClick={() => setShowCompose(false)}
                  className="px-6 py-3 text-[#122064] dark:text-blue-400 border border-[#122064] dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#122064] dark:bg-blue-600 text-white rounded-xl hover:bg-[#1a2d8a] dark:hover:bg-blue-700 transition-colors"
                >
                  Send Notification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;