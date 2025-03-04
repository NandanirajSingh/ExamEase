import React, { useState } from "react";
import { GraduationCap, Users } from "lucide-react";

const RoleSelector = ({ setRole }) => {
  const [role, setLocalRole] = useState("student");

  const handleRoleChange = (selectedRole) => {
    setLocalRole(selectedRole);
    setRole(selectedRole);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-xs h-12 bg-gray-100 shadow-md rounded-lg">
        <div 
          className={`absolute top-0 left-0 w-1/2 h-full bg-[#122064] rounded-lg transition-transform duration-300 ease-in-out ${
            role === "student" ? "translate-x-0" : "translate-x-full"
          }`}
        />
        <div className="relative flex w-full h-full">
          <button
            className={`flex-1 flex items-center justify-center space-x-2 z-10 text-sm font-medium ${
              role === "student" ? "text-white" : "text-gray-700"
            }`}
            onClick={() => handleRoleChange("student")}
            aria-pressed={role === "student"}
          >
            <GraduationCap className="w-5 h-5" />
            <span>Student</span>
          </button>
          <button
            className={`flex-1 flex items-center justify-center space-x-2 z-10 text-sm font-medium ${
              role === "teacher" ? "text-white" : "text-gray-700"
            }`}
            onClick={() => handleRoleChange("teacher")}
            aria-pressed={role === "teacher"}
          >
            <Users className="w-5 h-5" />
            <span>Teacher</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);

const Loginauth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex justify-center items-center min-h-screen font-sans bg-[#ECFFFF]" >
      <div className="flex bg-white shadow-2xl rounded-2xl w-[950px] h-[600px] overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:block md:w-1/2 relative flex items-center justify-center text-center p-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: "url('Mobile login-rafiki.svg')",
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}></div>
          
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center p-8">
          <div className="w-full max-w-md">
            {/* App Logo and Name */}
            <div className="flex self-start mb-5 gap-1.5">
              <GraduationCap size={32} className="text-[#122064]" />
              <h2 className="text-2xl text-[#122064] font-bold font-sans">ExamEase</h2>
            </div>

            {/* Role Selector */}
            <RoleSelector setRole={setRole} />

            <h2 className="text-[#122064] text-xl font-bold mt-5">{isLogin ? "Login" : "Create Account"}</h2>
            <p className="text-gray-500 text-sm mb-5">Please enter your details</p>

            {/* Form Fields */}
            <form className="w-full flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#122064] focus:ring-1 focus:ring-[#122064]"
                required
              />
              <input
                type="password"
                placeholder={isLogin ? "Enter Password" : "Create Password"}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#122064] focus:ring-1 focus:ring-[#122064]"
                required
              />
              {!isLogin && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#122064] focus:ring-1 focus:ring-[#122064]"
                  required
                />
              )}

              {isLogin && (
                <div className="flex justify-between items-center text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1 focus:ring-[#122064] focus:ring-offset-0" /> Remember me
                  </label>
                  <a href="#" className="text-[#122064]">Forgot Password?</a>
                </div>
              )}

              <button 
                type="button" 
                className="w-full py-2 mt-3 text-white bg-[#122064] rounded hover:bg-[#122045] focus:outline-none focus:ring-2 focus:ring-[#122064] focus:ring-opacity-50"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            {/* Google Auth Button */}
            <div className="w-full flex justify-center items-center gap-2 border border-gray-300 rounded py-2 mt-4 cursor-pointer hover:bg-gray-100 focus:outline-none focus:border-[#122064]">
              <GoogleIcon />
              <span className="font-semibold">{isLogin ? "Sign in with Google" : "Sign up with Google"}</span>
            </div>

            {/* Toggle Between Forms */}
            <p className="text-sm mt-3 text-center">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span onClick={toggleForm} className="text-[#122064] cursor-pointer">
                {isLogin ? "Sign up" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginauth;