import React from 'react';

function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ECF9FF]">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-[#122064] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-3 bg-[#122064] rounded-full animate-pulse opacity-70"></div>
          <div className="absolute inset-[42%] bg-white rounded-full"></div>
        </div>
        <p className="text-[#122064] font-medium text-lg animate-pulse">{message}</p>
      </div>
    </div>
  );
}

export default LoadingScreen;