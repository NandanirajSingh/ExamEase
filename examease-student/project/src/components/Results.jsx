import React, { useState } from 'react';
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
  Plus,
  CalendarIcon,
  X,
  Eye,
  Edit,
  Upload,
  Trash2,
  FileText,
  Download,
  FileSearch
} from 'lucide-react';

function Results({ darkMode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [resultToDelete, setResultToDelete] = useState(null);
  const [hasResults, setHasResults] = useState(false);

  // Sample result data (not displayed initially)
  const sampleResults = [
    {
      id: 1,
      examName: "Midterm Examination",
      examType: "Semester",
      examDate: "2025-03-15",
      fileName: "midterm_results.pdf",
      fileType: "pdf"
    },
    {
      id: 2,
      examName: "Mathematics Quiz",
      examType: "Unit",
      examDate: "2025-02-28",
      fileName: "math_quiz_results.csv",
      fileType: "csv"
    },
    {
      id: 3,
      examName: "Science Assessment",
      examType: "Class Test",
      examDate: "2025-03-05",
      fileName: "science_assessment.pdf",
      fileType: "pdf"
    }
  ];

  const menuItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Exam Guidelines', path: '/exam-guidelines', icon: FileEdit },
    { label: 'Results', path: '/results', icon: LineChart },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleDelete = (result) => {
    setResultToDelete(result);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    // In a real app, you would delete the result from your data source
    setShowDeleteConfirm(false);
    setResultToDelete(null);
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="text-red-500" />;
      case 'csv':
        return <FileText className="text-green-500" />;
      default:
        return <FileText className="text-blue-500" />;
    }
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
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#122064]'}`}>Results</h1>
          </div>
        </header>

        {/* Results Content */}
        <div className="mt-20 p-6">
          {hasResults ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {sampleResults.map((result) => (
                <div key={result.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border`}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#122064]'} line-clamp-2`}>{result.examName}</h3>
                    <span className={`px-3 py-1 ${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-[#ECF9FF] text-[#122064]'} rounded-full text-sm font-medium`}>
                      {result.examType}
                    </span>
                  </div>
                  <div className="space-y-3 mb-6">
                    <p className={`flex items-center gap-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-2 rounded-lg`}>
                      <CalendarIcon size={18} className={darkMode ? 'text-blue-400' : 'text-[#122064]'} />
                      <span className={`font-medium ${darkMode ? 'text-gray-200' : ''}`}>{result.examDate}</span>
                    </p>
                    <div className={`flex items-center gap-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-2 rounded-lg`}>
                      {getFileIcon(result.fileType)}
                      <span className={`font-medium truncate ${darkMode ? 'text-gray-200' : ''}`}>{result.fileName}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className={`flex-1 flex items-center justify-center gap-1 ${
                        darkMode 
                          ? 'border-2 border-blue-500 text-blue-400 hover:bg-gray-700' 
                          : 'border-2 border-[#122064] text-[#122064] hover:bg-[#ECF9FF]'
                      } px-3 py-3 rounded-lg transition-all duration- 300`}
                    >
                      <Eye size={16} />
                      View
                    </button>
                    <button
                      className={`flex-1 flex items-center justify-center gap-1 ${
                        darkMode 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-[#122064] hover:bg-[#1a2d8a]'
                      } text-white px-3 py-3 rounded-lg transition-all duration-300 shadow-md`}
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>        
              ))}
            </div>
          ) : (
            <div className={`flex flex-col items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-10 max-w-2xl mx-auto mt-10`}>
              <div className={`w-24 h-24 ${darkMode ? 'bg-gray-700' : 'bg-[#ECF9FF]'} rounded-full flex items-center justify-center mb-6`}>
                <FileSearch size={40} className={darkMode ? 'text-blue-400' : 'text-[#122064]'} />
              </div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#122064]'} mb-3`}>No Results Found</h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-center mb-6 max-w-md`}>
                There are no exam results available at the moment. Results will appear here once they are published.
              </p>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl w-full max-w-md shadow-2xl p-6`}>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={32} className="text-red-500" />
                </div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Delete Result</h2>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                  Are you sure you want to delete "{resultToDelete?.examName}"? This action cannot be undone.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className={`flex-1 px-6 py-3 ${
                      darkMode 
                        ? 'border-2 border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
                    } rounded-lg transition-colors`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Results;