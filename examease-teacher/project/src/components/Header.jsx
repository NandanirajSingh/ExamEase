import React from 'react';
import { Bell, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

function Header({ isCollapsed, title: propTitle }) {
  const location = useLocation();
  
  const getTitle = () => {
    if (propTitle) return propTitle;
    
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/create-exam':
        return 'Create Exam';
      case '/notifications':
        return 'Notifications';
      case '/settings':
        return 'Settings';
      default:
        return 'ExamEase';
    }
  };

  return (
    <header className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed ${isCollapsed ? 'w-[calc(100%-5rem)]' : 'w-[calc(100%-16rem)]'} z-10 transition-all duration-300`}>
      <div className="flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold text-[#122064] dark:text-white">{getTitle()}</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Bell className="w-6 h-6 text-[#122064] dark:text-white" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <User className="w-6 h-6 text-[#122064] dark:text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;