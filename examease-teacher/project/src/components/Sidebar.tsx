import React from 'react';
import {
  Home,
  LayoutDashboard,
  FileText,
  Bell,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

function Sidebar({ isOpen }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: FileText, label: 'Create Exam' },
    { icon: Bell, label: 'Notifications' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <nav className="p-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center p-3 mb-2 rounded-lg text-[#122064] hover:bg-gray-100 transition-colors ${
              item.active ? 'bg-gray-100' : ''
            }`}
          >
            <item.icon className="w-6 h-6" />
            {isOpen && <span className="ml-3">{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;