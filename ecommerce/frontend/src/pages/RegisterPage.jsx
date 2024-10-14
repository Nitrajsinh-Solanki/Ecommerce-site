import React from "react";
import RegisterForm from "../components/RegisterForm"; 
import Navbar from "../components/Navbar"; 

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-300">
      <Navbar /> 
      <div className="mt-5 flex justify-center h-screen">
        <div className="w-full max-w-md p-6">
          <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create an Account</h2>
          
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
