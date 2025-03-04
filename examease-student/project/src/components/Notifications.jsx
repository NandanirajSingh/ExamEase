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

function Notifications({ darkMode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const menuItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Exam Guidelines', path: '/exam-guidelines', icon: FileEdit },
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

  const formatTimestamp = (timestamp) => {
    return timestamp; // This is a placeholder - in a real app, you'd format the timestamp
  };

  return (
   <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#ECF9FF] text-gray-900'}`}>
      {/* Sidebar */}
      <aside className={`${isCollapsed ? 'w-20' : 'w-64'} ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} fixed h-full transition-all duration-300 z-20 border-r`}>
        <div className={`flex items-center gap-2 p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button onClick={() => setIsCollapsed(!isCollapsed)} className={`${darkMode ? 'text-white hover:bg-gray-700' : 'text-[#122064] hover:bg-gray-100'} p-2 rounded-lg`}>
            <Menu size={24} />
          </button>
          {!isCollapsed && <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#122064]'}`}>ExamEase</span>}
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    location.pathname === item.path 
                      ? darkMode ? 'bg-gray-700 font-medium' : 'bg-gray-100 font-medium' 
                      : ''
                  } ${
                    darkMode 
                      ? 'text-white hover:bg-gray-700' 
                      : 'text-[#122064] hover:bg-gray-100'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <item.icon size={20} className={darkMode ? 'text-white' : 'text-[#122064]'} />
                  {!isCollapsed && <span className={darkMode ? 'text-white' : 'text-[#122064]'}>{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>


      {/* Main Content */}
      <main className={`${isCollapsed ? 'ml-20' : 'ml-64'} flex-1 flex flex-col min-h-screen transition-all duration-300`}>
        {/* Header */}
        <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b fixed ${isCollapsed ? 'w-[calc(100%-5rem)]' : 'w-[calc(100%-16rem)]'} z-10 transition-all duration-300`}>
          <div className="flex justify-between items-center px-10 py-5">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#122064]'}`}>Notifications</h1>
            <div className="flex items-center gap-4">
              {notifications.length === 0 ? null : (
                <button
                  onClick={() => setShowCompose(true)}
                  className={`flex items-center gap-2 px-4 py-1 ${
                    darkMode 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-[#122064] hover:bg-[#1a2d8a]'
                  } text-white rounded-lg transition-colors`}
                >
                  <Plus size={20} />
                  Create notification
                </button>
              )}
            </div>
          </div>
        </header>

       {/* Notification Content */}
        <div className="pt-24 p-8">
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-lg p-6 shadow-sm border ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'border-blue-200 bg-[#EAF9FF]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-full shadow-sm`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#122064]'}`}>
                            {notification.title}
                          </h3>
                          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{notification.message}</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>From: {notification.from}</p>
                        </div>
                        <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Clock size={14} className="mr-1" />
                          {formatTimestamp(notification.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-full mb-4`}>
                <Inbox size={48} className={darkMode ? 'text-gray-600' : 'text-gray-400'} />
              </div>
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>No notifications</h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>You're all caught up!</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

export default Notifications;