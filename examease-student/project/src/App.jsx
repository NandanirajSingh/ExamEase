import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import Results from './components/Results';
import Settings from './components/Settings';
import Notifications from './components/Notifications';
import ExamGuidelines from './components/ExamGuidelines';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  // Starting with an empty array of exams
  const [examCards, setExamCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleExamComplete = (examId) => {
    setExamCards(examCards.map(exam => 
      exam.id === examId ? {...exam, status: "completed"} : exam
    ));
  };

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (isLoading) {
    return <LoadingScreen message="Loading ExamEase..." />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Homepage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route 
          path="/dashboard" 
          element={
            <Dashboard 
              examCards={examCards} 
              setExamCards={setExamCards} 
              onExamComplete={handleExamComplete}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          } 
        />
        <Route path="/exam-guidelines" element={<ExamGuidelines darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/results" element={<Results darkMode={darkMode} setDarkMode={setDarkMode} />}/>
        <Route path="/notifications" element={<Notifications darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route 
          path="/settings" 
          element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;