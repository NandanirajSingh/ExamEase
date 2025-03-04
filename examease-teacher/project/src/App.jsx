import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Use lazy loading for components to improve performance
const Homepage = lazy(() => import('./components/Homepage'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const CreateExam = lazy(() => import('./components/CreateExam'));
const Results = lazy(() => import('./components/Results'));
const Settings = lazy(() => import('./components/Settings'));
const Notifications = lazy(() => import('./components/Notifications'));

// Enhanced loading component with animation
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#EAF9FF] dark:bg-gray-900">
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto mb-6">
        {/* Outer spinning circle */}
        <div className="absolute inset-0 border-4 border-[#122064] dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute inset-3 bg-[#122064] dark:bg-blue-400 rounded-full animate-pulse opacity-70"></div>
        
        {/* Center dot */}
        <div className="absolute inset-[42%] bg-white dark:bg-gray-800 rounded-full"></div>
      </div>
      <p className="text-[#122064] dark:text-blue-400 font-medium text-lg animate-pulse">Loading ExamEase...</p>
    </div>
  </div>
);

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize darkMode from localStorage or default to false
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });
  
  // Initialize examCards from localStorage or empty array
  const [examCards, setExamCards] = useState(() => {
    const savedExams = localStorage.getItem('examCards');
    return savedExams ? JSON.parse(savedExams) : [];
  });

  // Initialize results from localStorage or empty array
  const [results, setResults] = useState(() => {
    const savedResults = localStorage.getItem('results');
    return savedResults ? JSON.parse(savedResults) : [];
  });

  // Initialize notifications from localStorage or empty array
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem('notifications');
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  // Save examCards to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('examCards', JSON.stringify(examCards));
  }, [examCards]);
  
  // Save results to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('results', JSON.stringify(results));
  }, [results]);
  
  // Save notifications to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);
  
  // Save darkMode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Apply or remove dark class on the document element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleExamPublish = (examData) => {
    const updatedExams = [...examCards, examData];
    setExamCards(updatedExams);
    // Also save immediately to localStorage for redundancy
    localStorage.setItem('examCards', JSON.stringify(updatedExams));
  };

  return (
    <div className="bg-[#ECF9FF] dark:bg-gray-900 min-h-screen">
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Homepage darkMode={darkMode} />} />
          <Route path="/dashboard" element={<Dashboard examCards={examCards} setExamCards={setExamCards} darkMode={darkMode} />} />
          <Route path="/create-exam" element={<CreateExam onPublish={handleExamPublish} darkMode={darkMode} />} />
          <Route path="/results" element={<Results results={results} setResults={setResults} darkMode={darkMode} />} />
          <Route path="/notifications" element={<Notifications notifications={notifications} setNotifications={setNotifications} darkMode={darkMode} />} />
          <Route 
            path="/settings" 
            element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;