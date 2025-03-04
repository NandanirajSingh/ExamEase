import React, { useState } from "react";
import {
  BookOpen,
  Wifi,
  Clock,
  AlertTriangle,
  HelpCircle,
  Monitor,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Menu,
  Home,
  LayoutDashboard,
  LineChart,
  Bell,
  Settings,
  Shield
} from "lucide-react";
import { useLocation } from "react-router-dom";

const ExamGuidelines = ({ darkMode }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const menuItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Exam Guidelines", path: "/exam-guidelines", icon: BookOpen },
    { label: "Results", path: "/results", icon: LineChart },
    { label: "Notifications", path: "/notifications", icon: Bell },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#ECF9FF] text-gray-900'}`}>
      {/* Sidebar */}
      <aside
        className={`${isCollapsed ? "w-20" : "w-64"} ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} fixed h-full transition-all duration-300 z-20 border-r`}
      >
        <div className={`flex items-center gap-2 p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`${darkMode ? 'text-white hover:bg-gray-700' : 'text-[#122064] hover:bg-gray-100'} p-2 rounded-lg`}
          >
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
      <main
        className={`${isCollapsed ? "ml-20" : "ml-64"} flex-1 flex flex-col min-h-screen transition-all duration-300`}
      >
        {/* Header */}
        <header
          className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b fixed ${isCollapsed ? "w-[calc(100%-5rem)]" : "w-[calc(100%-16rem)]"} z-10 transition-all duration-300`}
        >
          <div className="flex justify-between items-center px-10 py-5">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#122064]'}`}>Exam Guidelines</h1>
          </div>
        </header>

        {/* Main Content */}
        <div className="mt-20 p-10">
          {/* Introduction Banner */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-[#122064]'} rounded-lg shadow-lg p-6 mb-10 text-white`}>
            <h2 className="text-2xl font-bold mb-3">Welcome to Your Online Examination</h2>
            <p className="text-lg">
              Please review these important guidelines carefully before starting your exam. Following these instructions
              will ensure a smooth testing experience and help maintain academic integrity.
            </p>
          </div>

          {/* Key Information Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-t-4 border-[#122064]'} rounded-lg shadow-md p-5`}>
              <div className="flex items-center mb-4">
                <Clock className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-[#122064]'} mr-3`} />
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-[#122064]'}`}>Time Management</h3>
              </div>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Login 15 minutes early. The exam timer starts automatically and cannot be paused once begun.
              </p>
            </div>

            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-t-4 border-[#122064]'} rounded-lg shadow-md p-5`}>
              <div className="flex items-center mb-4">
                <Shield className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-[#122064]'} mr-3`} />
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-[#122064]'}`}>Proctoring</h3>
              </div>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Your session will be monitored. Keep your webcam on and stay in view throughout the exam.
              </p>
            </div>

            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-t-4 border-[#122064]'} rounded-lg shadow-md p-5`}>
              <div className="flex items-center mb-4">
                <Settings className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-[#122064]'} mr-3`} />
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-[#122064]'}`}>Tech Setup</h3>
              </div>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Use a reliable device with a stable internet connection. Test your equipment beforehand.
              </p>
            </div>
          </div>

          {/* Do's and Don'ts Section */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-10`}>
            <h2 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-[#122064]'} mb-4`}>Quick Reference: Do's and Don'ts</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className={`${darkMode ? 'bg-green-900' : 'bg-green-50'} p-4 rounded-lg ${darkMode ? 'border-green-800' : 'border border-green-100'}`}>
                <h3 className={`text-lg font-medium ${darkMode ? 'text-green-100' : 'text-green-800'} flex items-center mb-3`}>
                  <CheckCircle className="h-5 w-5 mr-2" /> Do's
                </h3>
                <ul className="space-y-2 pl-2">
                  <li className="flex items-start">
                    <span className={`${darkMode ? 'text-green-300' : 'text-green-700'} mr-2`}>•</span>
                    <span className={darkMode ? 'text-green-100' : 'text-green-700'}>Test your equipment before the exam day</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${darkMode ? 'text-green-300' : 'text-green-700'} mr-2`}>•</span>
                    <span className={darkMode ? 'text-green-100' : 'text-green-700'}>Ensure a quiet, well-lit environment</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${darkMode ? 'text-green-300' : 'text-green-700'} mr-2`}>•</span>
                    <span className={darkMode ? 'text-green-100' : 'text-green-700'}>Keep your ID ready for verification</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${darkMode ? 'text-green-300' : 'text-green-700'} mr-2`}>•</span>
                    <span className={darkMode ? 'text-green-100' : 'text-green-700'}>Save your answers regularly if possible</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${darkMode ? 'text-green-300' : 'text-green-700'} mr-2`}>•</span>
                    <span className={darkMode ? 'text-green-100' : 'text-green-700'}>Contact support immediately if issues arise</span>
                  </li>
                </ul>
              </div>

              <div className={`${darkMode ? 'bg-red-900' : 'bg-red-50'} p-4 rounded-lg ${darkMode ? 'border-red-800' : 'border border-red-100'}`}>
                <h3 className={`text-lg font-medium ${darkMode ? 'text-red-100' : 'text-red-800'} flex items-center mb-3`}>
                  <XCircle className="h-5 w-5 mr-2" /> Don'ts
                </h3>
                <ul className="space-y-2 pl-2">
                  <li className="flex items-start">
                    <span className={`${darkMode ? 'text-red-300' : 'text-red-700'} mr-2`}>•</span>
                    <span className={darkMode ? 'text-red-100' : 'text-red-700'}>Use unauthorized materials or devices</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${darkMode ? 'text-red-300' : 'text-red-700'} mr-2`}>•</span>
                    <span className={darkMode ? 'text-red-100' : 'text-red-700'}>Leave the exam screen/webcam view</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${darkMode ? 'text-red-300' : 'text-red-700'} mr-2`}>•</span>
                    <span className={darkMode ? 'text-red-100' : 'text-red-700'}>Communicate with others during the exam</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${darkMode ? 'text-red-300' : 'text-red-700'} mr-2`}>•</span>
                    <span className={darkMode ? 'text-red-100' : 'text-red-700'}>Take screenshots or record exam content</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${darkMode ? 'text-red-300' : 'text-red-700'} mr-2`}>•</span>
                    <span className={darkMode ? 'text-red-100' : 'text-red-700'}>Wait until the last minute to submit</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Troubleshooting Section */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-10`}>
            <h2 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-[#122064]'} mb-4 flex items-center`}>
              <AlertTriangle className="h-6 w-6 mr-2 text-amber-500" />
              Troubleshooting Common Issues
            </h2>

            <div className="space-y-4">
              <div className="border-l-4 border-amber-500 pl-4 py-2">
                <h3 className={`font-medium ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>Connection Lost</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Try to reconnect immediately. Most platforms save your progress automatically. If unable to reconnect
                  within 5 minutes, contact support.
                </p>
              </div>

              <div className="border-l-4 border-amber-500 pl-4 py-2">
                <h3 className={`font-medium ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>Page Not Loading</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Clear your browser cache, disable extensions, or try a different browser. Check if your internet
                  connection is stable.
                </p>
              </div>
            </div>

            <div className={`mt-5 ${darkMode ? 'bg-amber-900' : 'bg-amber-50'} p-4 rounded-lg`}>
              <p className={`flex items-center ${darkMode ? 'text-amber-100' : 'text-amber-800'}`}>
                <HelpCircle className="h-5 w-5 mr-2" />
                <span>
                  For immediate assistance during the exam, contact technical support at:{" "}
                  <strong>support@university.edu</strong> or call <strong>(555) 123-4567</strong>
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamGuidelines;