import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, Lock, Bell, Moon, AlertTriangle, Camera, Upload, Menu, Home, LayoutDashboard, FileEdit, LineChart, Settings as SettingsIcon, Shield } from 'lucide-react';
import Switch from 'react-switch';
import { useNavigate, useLocation } from 'react-router-dom';

function Settings({ darkMode, setDarkMode }) {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    activityLogs: true,
    emailNotifications: true,
    appNotifications: true
  });

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Create Exam', path: '/create-exam', icon: FileEdit },
    { label: 'Results', path: '/results', icon: LineChart },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleChange = (name) => {
    setFormData(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setShowCameraModal(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please make sure you have granted camera permissions.");
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    setProfileImage(canvas.toDataURL('image/jpeg'));
    stopCamera();
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setShowCameraModal(false);
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
            <h1 className="text-2xl font-bold text-[#122064] dark:text-white">Settings</h1>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto px-6 py-24 max-w-4xl">
          {/* Profile Settings */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-[#122064] dark:text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Settings
            </h2>

            {/* Profile Picture */}
            <div className="mb-8 flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#122064] dark:border-blue-500">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 flex gap-2">
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="p-2 bg-[#122064] dark:bg-blue-600 text-white rounded-full hover:bg-[#1a2d8a] dark:hover:bg-blue-700 transition-colors"
                    title="Upload photo"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                  <button
                    onClick={startCamera}
                    className="p-2 bg-[#122064] dark:bg-blue-600 text-white rounded-full hover:bg-[#1a2d8a] dark:hover:bg-blue-700 transition-colors"
                    title="Take photo"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Click on the buttons to upload or capture a new profile picture
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </section>

          {/* Security Settings */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-[#122064] dark:text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Settings
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Change Password</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#122064] dark:bg-gray-700 dark:text-white"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#122064] dark:bg-gray-700 dark:text-white"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#122064] dark:bg-gray-700 dark:text-white"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <button className="mt-4 px-4 py-2 bg-[#122064] text-white rounded-lg hover:bg-[#1a2d8a] transition-colors">
                  Update Password
                </button>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enable two-factor authentication for added security
                  </p>
                  <Switch
                    checked={false}
                    onChange={() => {}}
                    onColor="#122064"
                    checkedIcon={false}
                    uncheckedIcon={false}
                    height={24}
                    width={48}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-[#122064] dark:text-white mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive email notifications</p>
                </div>
                <Switch
                  checked={formData.emailNotifications}
                  onChange={() => handleToggleChange('emailNotifications')}
                  onColor="#122064"
                  offColor="#374151"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={24}
                  width={48}
                />
              </div>
             
            </div>
          </section>

          {/* Theme Settings */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-[#122064] dark:text-white mb-6 flex items-center gap-2">
              <Moon className="w-5 h-5" />
              Theme Settings
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark mode theme</p>
              </div>
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                onColor="#122064"
                offColor="#374151"
                checkedIcon={false}
                uncheckedIcon={false}
                height={24}
                width={48}
              />
            </div>
          </section>

          {/* Deactivate Account */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-red-600 dark:text-red-500 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Deactivate Account
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Deactivating your account will remove all your data and cannot be undone.
              </p>
              <button
                onClick={() => setShowDeactivateModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Deactivate Account
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Camera Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Take a Photo</h3>
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={stopCamera}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={capturePhoto}
                className="px-4 py-2 bg-[#122064] dark:bg-blue-600 text-white rounded-lg hover:bg-[#1a2d8a] dark:hover:bg-blue-700"
              >
                Capture
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deactivate Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Confirm Deactivation</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to deactivate your account? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeactivateModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle deactivation logic here
                  setShowDeactivateModal(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;