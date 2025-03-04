import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Notifications from './components/Notifications';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#EAF9FF]">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} currentPage="notifications" />
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          <Notifications />
        </main>
      </div>
    </div>
  );
}

export default App;