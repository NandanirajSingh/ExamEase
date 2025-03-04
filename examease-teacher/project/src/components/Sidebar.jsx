import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Home, LayoutDashboard, FileEdit, LineChart, Bell, Settings } from 'lucide-react';

function Sidebar({ isCollapsed, setIsCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/create-exam', icon: FileEdit, label: 'Create Exam' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

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
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed h-full transition-all duration-300 z-20`}>
      <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-[#122064] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
          <Menu size={24} />
        </button>
        {!isCollapsed && <span className="text-xl font-bold text-[#122064] dark:text-white">ExamEase</span>}
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors
                  ${location.pathname === item.path 
                    ? 'bg-gray-100 dark:bg-gray-700 text-[#122064] dark:text-white font-medium' 
                    : 'text-[#122064] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'}
                  ${isCollapsed ? 'justify-center' : ''}`}
              >
                <item.icon size={20} />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;