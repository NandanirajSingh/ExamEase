import React, { useState, useEffect } from 'react';
import {
  PlusCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  ClipboardList,
  Menu,
  Home,
  LayoutDashboard,
  FileEdit,
  LineChart,
  Bell,
  Settings,
  Calendar,
  Upload,
  Trash2,
  FileText
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

function Dashboard({ examCards, setExamCards, darkMode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Add loading effect
  useEffect(() => {
    // Simulate loading for a smoother transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: 'Scheduled Exams', value: examCards.filter(exam => exam.status === 'scheduled').length, icon: Clock },
    { label: 'Active Exams', value: examCards.filter(exam => exam.status === 'active').length, icon: AlertCircle },
    { label: 'Completed Exams', value: examCards.filter(exam => exam.status === 'completed').length, icon: CheckCircle },
  ];

  const menuItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Create Exam', path: '/create-exam', icon: FileEdit },
    { label: 'Results', path: '/results', icon: LineChart },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleDeleteExam = (examId) => {
    const updatedExams = examCards.filter(exam => exam.id !== examId);
    setExamCards(updatedExams);
    // Also update localStorage
    localStorage.setItem('examCards', JSON.stringify(updatedExams));
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#ECF9FF] dark:bg-gray-900">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-[#122064] dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-3 bg-[#122064] dark:bg-blue-400 rounded-full animate-pulse opacity-70"></div>
            <div className="absolute inset-[42%] bg-white dark:bg-gray-800 rounded-full"></div>
          </div>
          <p className="text-[#122064] dark:text-blue-400 font-medium text-lg animate-pulse">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-[#122064] dark:text-white">Dashboard</h1>
          </div>
        </header>

        {/* Content */}
        <div className="pt-20 px-10">
          {/* Stats Section */}
          <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{stat.label}</p>
                    <p className="text-3xl font-bold text-[#122064] dark:text-blue-400">{stat.value}</p>
                  </div>
                  <stat.icon className="w-12 h-12 text-[#122064] dark:text-blue-400 opacity-20" />
                </div>
              </div>
            ))}
          </div>

          {/* Create Exam Button */}
          <div className="mb-8">
            <button 
              onClick={() => handleNavigation('/create-exam')}
              className="bg-[#122064] dark:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center hover:bg-opacity-90 transition-colors"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Create New Exam
            </button>
          </div>

          {/* Exam Cards */}
          {examCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examCards.map((exam) => (
                <div key={exam.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[#122064] dark:text-white line-clamp-1">{exam.examTitle}</h3>
                    <span className="px-3 py-1 bg-[#ECF9FF] dark:bg-gray-700 text-[#122064] dark:text-blue-400 rounded-full text-sm font-medium">
                      {exam.examType}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Clock size={18} className="text-[#122064] dark:text-blue-400" />
                      <span>Duration: {exam.examDuration} minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Calendar size={18} className="text-[#122064] dark:text-blue-400" />
                      <span>Date: {exam.examDate || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <FileText size={18} className="text-[#122064] dark:text-blue-400" />
                      <span>Total Marks: {exam.totalMarks}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteExam(exam.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-500 text-red-500 dark:border-red-400 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#122064] dark:bg-blue-600 text-white rounded-lg hover:bg-[#1a2d8a] dark:hover:bg-blue-700 transition-colors"
                    >
                      <Upload size={16} />
                      Upload
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
              <div className="w-20 h-20 bg-[#ECF9FF] dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardList size={40} className="text-[#122064] dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-[#122064] dark:text-white mb-2">No Exams Created Yet</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Create your first exam by clicking the button above.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;