import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionForm from './QuestionForm';
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
  CalendarIcon
} from 'lucide-react';

function CreateExam({ onPublish, darkMode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [examDate, setExamDate] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Create Exam', path: '/create-exam', icon: FileEdit },
    { label: 'Results', path: '/results', icon: LineChart },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    // Create the exam data object
    const examData = {
      id: Date.now(),
      ...data,
      questions,
      timestamp: new Date().toISOString(),
      status: 'scheduled'
    };
    
    // Simulate a slight delay to show the loading animation
    setTimeout(() => {
      onPublish(examData);
      reset();
      setQuestions([]);
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 800);
  };

  const addQuestion = () => {
    const newQuestion = {
      id: `question-${questions.length + 1}`,
      type: "",
      text: "",
      marks: 1,
      options: [],
      correctAnswer: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (updatedQuestion) => {
    setQuestions(questions.map(q => 
      q.id === updatedQuestion.id ? updatedQuestion : q
    ));
  };

  const removeQuestion = (questionId) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const handleCancel = () => {
    reset();
    setQuestions([]);
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
          <div className="flex justify-between items-center px-10 py-5">
            <h1 className="text-2xl font-bold text-[#122064] dark:text-white">Create Exam</h1>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8 bg-[#ECF9FF] dark:bg-gray-900 max-w-[1200px] mt-20">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#122064] dark:text-white">
                  Enter Exam Title:
                </label>
                <input
                  type="text"
                  {...register("examTitle", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 transition-all duration-200 hover:border-[#122064] dark:hover:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Final Mathematics Examination"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#122064] dark:text-white">
                  Enter Exam Description:
                </label>
                <textarea
                  {...register("examDescription")}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 transition-all duration-200 hover:border-[#122064] dark:hover:border-blue-500 dark:bg-gray-700 dark:text-white"
                  rows={4}
                  placeholder="Describe the exam content and requirements..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Exam Date */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-[#122064] dark:text-white">
                  Select Exam Date:
                </label>
                <div className="relative">
                  <input
                    type="date"
                    {...register("examDate")}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 pr-10 transition-all duration-200 hover:border-[#122064] dark:hover:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                </div>
              </div>

              {/* Start Time */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#122064] dark:text-white">
                  Select Start Time:
                </label>
                <input
                  type="time"
                  {...register("startTime")}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 transition-all duration-200 hover:border-[#122064] dark:hover:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* End Time */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#122064] dark:text-white">
                  Select End Time:
                </label>
                <input
                  type="time"
                  {...register("endTime")}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 transition-all duration-200 hover:border-[#122064] dark:hover:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Second Row: Exam Duration & Exam Type */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Exam Duration */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-[#122064] dark:text-white">
                  Set Exam Duration (in minutes):
                </label>
                <input
                  type="number"
                  {...register("examDuration", { required: true, min: 1 })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 transition-all duration-200 hover:border-[#122064] dark:hover:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., 120"
                />
              </div>

              {/* Exam Type */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-[#122064] dark:text-white">
                  Select Exam Type:
                </label>
                <select
                  {...register("examType")}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 bg-white dark:bg-gray-700 transition-all duration-200 hover:border-[#122064] dark:hover:border-blue-500 dark:text-white"
                >
                  <option value="">Select Exam Type</option>
                  <option value="Unit">Unit Test</option>
                  <option value="Semester">Semester Exam</option>
                  <option value="ClassTest">Class Test</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#122064] dark:text-white">
                  Enter Total Marks:
                </label>
                <input
                  type="number"
                  {...register("totalMarks", { required: true, min: 1 })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 transition-all duration-200 hover:border-[#122064] dark:hover:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., 100"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#122064] dark:text-white">
                  Enter Passing Marks:
                </label>
                <input
                  type="number"
                  {...register("passingMarks", { required: true, min: 1 })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 transition-all duration-200 hover:border-[#122064] dark:hover:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., 40"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#122064] dark:text-white">
                Select Number of Attempts Allowed:
              </label>
              <select
                {...register("allowedAttempts")}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 bg-white dark:bg-gray-700 transition-all duration-200 hover:border-[#122064] dark:hover:border-blue-500 dark:text-white"
              >
                <option value="">Select Attempts</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="unlimited">Unlimited</option>
              </select>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#122064] dark:text-white">Questions</h2>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="flex items-center gap-2 px-4 py-2 bg-[#122064] dark:bg-blue-600 text-white rounded-lg hover:bg-[#1e3399] dark:hover:bg-blue-700 transition-colors group"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                  Add Question
                </button>
              </div>
              {questions.map((question) => (
                <QuestionForm
                  key={question.id}
                  question={question}
                  updateQuestion={updateQuestion}
                  removeQuestion={() => removeQuestion(question.id)}
                  darkMode={darkMode}
                />
              ))}
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#122064] dark:text-white">Exam Security & Proctoring Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="flex items-center space-x-4 py-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("faceRecognition")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#122064] dark:peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#122064] dark:peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Face Recognition</span>
                </div>
                
                <div className="flex items-center space-x-4 py-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("cameraMonitoring")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#122064] dark:peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#122064] dark:peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Camera & Microphone Monitoring</span>
                </div>
                
                <div className="flex items-center space-x-4 py-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("tabSwitching")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#122064] dark:peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#122064] dark:peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Prevent Tab Switching</span>
                </div>
                
                <div className="flex items-center space-x-4 py-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("copyPaste")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#122064] dark:peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#122064] dark:peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Disable Copy-Paste</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-[#122064] dark:border-blue-500 text-[#122064] dark:text-blue-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-[#122064] dark:bg-blue-600 text-white rounded-lg hover:bg-[#1e3399] dark:hover:bg-blue-700 font-medium transition-colors flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Publishing...</span>
                  </>
                ) : (
                  <span>Publish Exam</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateExam;