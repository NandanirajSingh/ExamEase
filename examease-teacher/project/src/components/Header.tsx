import React from 'react';
import { Bell, User, Menu } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-6 h-6 text-[#122064]" />
          </button>
          <h1 className="ml-4 text-2xl font-bold text-[#122064]">ExamEase</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="w-6 h-6 text-[#122064]" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <User className="w-6 h-6 text-[#122064]" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;