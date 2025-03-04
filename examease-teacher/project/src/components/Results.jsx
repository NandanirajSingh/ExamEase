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
  Trash2
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

function Results({ results, setResults, darkMode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    examName: '',
    examType: 'Unit',
    examDate: '',
    file: null
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [resultToDelete, setResultToDelete] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newResult = {
      id: Date.now(),
      ...formData,
      fileName: formData.file ? formData.file.name : 'No file uploaded'
    };
    setResults([...results, newResult]);
    setIsModalOpen(false);
    setFormData({
      examName: '',
      examType: 'Unit',
      examDate: '',
      file: null
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleEdit = (result) => {
    setFormData(result);
    setIsModalOpen(true);
  };

  const handleDelete = (result) => {
    setResultToDelete(result);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setResults(results.filter(r => r.id !== resultToDelete.id));
    setShowDeleteConfirm(false);
    setResultToDelete(null);
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
          <div className="flex justify-between items-center px-5 py-3">
            <h1 className="text-2xl font-bold text-[#122064] dark:text-white">Results</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[#122064] dark:bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-[#1a2d8a] dark:hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <Plus size={20} />
              Create Result
            </button>
          </div>
        </header>

        {/* Results Content */}
        <div className="mt-20 p-6">
          {results.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 max-w-lg m-auto">

              <div className="text-center mb-6 justify-center ">
                <div className="bg-[#ECF9FF] dark:bg-gray-700 p-6 rounded-full inline-block mb-6 ">
                  <ClipboardList size={64} className="text-[#122064] dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-[#122064] dark:text-white mb-3">No Results Created Yet</h2>
                <p className="text-gray-600 dark:text-gray-400 text-m">Click the 'Create Result' button in the top right to add your first exam result.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">

              {results.map((result) => (
                <div key={result.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#122064] dark:text-white line-clamp-2">{result.examName}</h3>
                    <span className="px-3 py-1 bg-[#ECF9FF] dark:bg-gray-700 text-[#122064] dark:text-blue-400 rounded-full text-sm font-medium">
                      {result.examType}
                    </span>
                  </div>
                  <div className="space-y-3 mb-6">
                    <p className="text-gray-600 dark:text-gray-400 flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
                      <CalendarIcon size={18} className="text-[#122064] dark:text-blue-400" />
                      <span className="font-medium">{result.examDate}</span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg truncate">
                      <FileEdit size={18} className="text-[#122064] dark:text-blue-400" />
                      <span className="font-medium truncate">{result.fileName}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(URL.createObjectURL(result.file), '_blank')}
                      className="flex-1 flex items-center justify-center gap-1 border-2 border-[#122064] dark:border-blue-500 text-[#122064] dark:text-blue-500 px-3 py-3 rounded-lg hover:bg-[#ECF9FF] dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      <Eye size={16} />
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(result)}
                      className="flex-1 flex items-center justify-center gap-1 border-2 border-[#122064] dark:border-blue-500 text-[#122064] dark:text-blue-500 px-3 py-3 rounded-lg hover:bg-[#ECF9FF] dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(result)}
                      className="flex-1 flex items-center justify-center gap-1 bg-[red] text-white px-3 py-3 rounded-lg hover:bg-[#FF3000] transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                   <div>
                   <button
                    className="w-64 h-10 bg-[#122064] dark:bg-blue-600 text-white px-5 py-2 mt-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#1a2d8a] dark:hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <Upload size={16} />
                    <span>Upload Result</span>
                  </button>

                   </div>
                </div>        
              ))}
            </div>
          )}
        </div>

        {/* Create/Edit Result Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-[#122064] dark:text-white">
                  {formData.id ? 'Edit Result' : 'Create Result'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Exam Name
                    </label>
                    <input
                      type="text"
                      value={formData.examName}
                      onChange={(e) => setFormData({ ...formData, examName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#122064] dark:focus:border-blue-500 transition-colors dark:bg-gray-700 dark:text-white"
                      placeholder="Enter exam name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Exam Type
                    </label>
                    <select
                      value={formData.examType}
                      onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#122064] dark:focus:border-blue-500 transition-colors dark:bg-gray-700 dark:text-white"
                    >
                      <option value="Unit">Unit Test</option>
                      <option value="Semester">Semester Exam</option>
                      <option value="Class Test">Class Test</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Date of Exam
                    </label>
                    <input
                      type="date"
                      value={formData.examDate}
                      onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#122064] dark:focus:border-blue-500 transition-colors dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Upload Result File
                    </label>
                    <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg p-6 text-center hover:border-[#122064] dark:hover:border-blue-500 transition-colors">
                      <input
                        type="file"
                        accept=".csv,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                        required={!formData.id}
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload size={32} className="mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Click to upload or drag and drop<br />
                          CSV or PDF files only
                        </p>
                        {formData.file && (
                          <p className="mt-2 text-sm text-[#122064] dark:text-blue-400 font-medium">
                            Selected: {formData.file.name}
                          </p>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-[#122064] dark:bg-blue-600 text-white rounded-lg hover:bg-[#1a2d8a] dark:hover:bg-blue-700 transition-colors shadow-md"
                  >
                    {formData.id ? 'Update Result' : 'Create Result'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={32} className="text-red-500 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Delete Result</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Are you sure you want to delete "{resultToDelete.examName}"? This action cannot be undone.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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