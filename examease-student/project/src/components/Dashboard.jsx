import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Menu,
  Home,
  LayoutDashboard,
  FileEdit,
  LineChart,
  Bell,
  Settings,
  Calendar,
  FileText,
  Play,
  Info
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

function Dashboard({ examCards, setExamCards, onExamComplete, darkMode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showExamDetails, setShowExamDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
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
    { label: 'Exam Guidelines', path: '/exam-guidelines', icon: FileEdit },
    { label: 'Results', path: '/results', icon: LineChart },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleJoinExam = (examId) => {
    // In a real app, this would navigate to the exam page
    alert(`Joining exam ${examId}`);
    
    // For demo purposes, mark the exam as completed after "joining"
    if (window.confirm("For demo purposes: Would you like to mark this exam as completed?")) {
      onExamComplete(examId);
    }
  };

  const toggleExamDetails = (examId) => {
    setShowExamDetails(showExamDetails === examId ? null : examId);
  };

  if (isLoading) {
    return <LoadingScreen message="Loading Dashboard..." />;
  }

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
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#122064]'}`}>Dashboard</h1>
          </div>
        </header>

        {/* Content */}
        <div className="pt-20 px-10">
          {/* Stats Section */}
          <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-500'}>{stat.label}</p>
                    <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#122064]'}`}>{stat.value}</p>
                  </div>
                  <stat.icon className={`w-12 h-12 ${darkMode ? 'text-blue-400' : 'text-[#122064]'} opacity-20`} />
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Exams Section */}
          <div className="mb-10">
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#122064]'} mb-4`}>Upcoming Exams</h2>
            {examCards.filter(exam => exam.status !== 'completed').length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {examCards.filter(exam => exam.status !== 'completed').map((exam) => (
                  <div key={exam.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300`}>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#122064]'} line-clamp-1`}>{exam.examTitle}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        exam.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : darkMode ? 'bg-blue-900 text-blue-100' : 'bg-[#ECF9FF] text-[#122064]'
                      }`}>
                        {exam.status === 'active' ? 'Active Now' : exam.examType}
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <Clock size={18} className={darkMode ? 'text-blue-400' : 'text-[#122064]'} />
                        <span>Duration: {exam.examDuration} minutes</span>
                      </div>
                      <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <Calendar size={18} className={darkMode ? 'text-blue-400' : 'text-[#122064]'} />
                        <span>Date: {exam.examDate}</span>
                      </div>
                      <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <FileText size={18} className={darkMode ? 'text-blue-400' : 'text-[#122064]'} />
                        <span>Total Marks: {exam.totalMarks}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleExamDetails(exam.id)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 ${
                          darkMode 
                            ? 'border border-blue-500 text-blue-400 hover:bg-blue-900' 
                            : 'border border-[#122064] text-[#122064] hover:bg-[#ECF9FF]'
                        } rounded-lg transition-colors`}
                      >
                        <Info size={16} />
                        Details
                      </button>
                      <button
                        onClick={() => handleJoinExam(exam.id)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          exam.status === 'active'
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : darkMode 
                              ? 'bg-blue-600 text-white hover:bg-blue-700' 
                              : 'bg-[#122064] text-white hover:bg-[#1a2d8a]'
                        }`}
                        disabled={exam.status !== 'active'}
                      >
                        <Play size={16} />
                        {exam.status === 'active' ? 'Join Now' : 'Join Exam'}
                      </button>
                    </div>

                    {/* Exam Details Dropdown */}
                    {showExamDetails === exam.id && (
                      <div className={`mt-4 p-4 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-lg border`}>
                        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#122064]'} mb-2`}>Exam Details</h4>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>{exam.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Start Time:</span> {exam.startTime}
                          </div>
                          <div>
                            <span className="font-medium">End Time:</span> {exam.endTime}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-md text-center`}>
                <Clock size={48} className={`mx-auto ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`} />
                <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>No upcoming exams</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Your upcoming exams will appear here when assigned by your teacher</p>
              </div>
            )}
          </div>

          {/* Completed Exams Section */}
          <div>
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#122064]'} mb-4`}>Completed Exams</h2>
            {examCards.filter(exam => exam.status === 'completed').length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {examCards.filter(exam => exam.status === 'completed').map((exam) => (
                  <div key={exam.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-green-500`}>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#122064]'} line-clamp-1`}>{exam.examTitle}</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Completed
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <Clock size={18} className={darkMode ? 'text-blue-400' : 'text-[#122064]'} />
                        <span>Duration: {exam.examDuration} minutes</span>
                      </div>
                      <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <Calendar size={18} className={darkMode ? 'text-blue-400' : 'text-[#122064]'} />
                        <span>Date: {exam.examDate}</span>
                      </div>
                      <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <FileText size={18} className={darkMode ? 'text-blue-400' : 'text-[#122064]'} />
                        <span>Total Marks: {exam.totalMarks}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/results')}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2 ${
                        darkMode 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-[#122064] text-white hover:bg-[#1a2d8a]'
                      } rounded-lg transition-colors`}
                    >
                      <LineChart size={16} />
                      View Results
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-md text-center mb-10`}>
                <CheckCircle size={48} className={`mx-auto ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`} />
                <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>No completed exams yet</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Your completed exams will appear here</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;