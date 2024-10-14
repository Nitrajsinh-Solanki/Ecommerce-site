import React from 'react';
import { Link } from 'react-router-dom'; 
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6 bg-gray-300">
        <div className="w-full max-w-md animate-fadeInUp transform transition-all duration-700 ease-in-out">
          <div className="bg-white p-8 rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105">
            <h2 className="text-4xl font-bold text-center mb-6 text-gray-800 animate-pulse">
              Welcome Back
            </h2>
            <p className="text-center text-gray-500 mb-4">
              Login to access your account
            </p>
            
            <LoginForm />

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="text-blue-600 hover:underline hover:text-blue-800 transition-all"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
