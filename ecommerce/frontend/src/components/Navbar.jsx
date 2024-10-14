import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

const Navbar = ({ onSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/'); 
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const showLinks = () => {
    if (location.pathname === '/') {
      return (
        <>
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
          <Link to="/register" className="text-white hover:underline">
            Register
          </Link>
        </>
      );
    } else {
      return (
        <button
          onClick={handleLogout}
          className="text-white hover:underline"
        >
          {location.pathname === "/login" || location.pathname === "/register"
            ? "Go back"
            : "Logout"}
        </button>
      );
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        
        <h1 className="text-white text-2xl font-bold">Ecommerce Site</h1>

        
        {location.pathname === '/admin' && (
          <h1 className="text-white text-2xl font-bold mx-auto">
            Admin Dashboard
          </h1>
        )}

       
        {(location.pathname === '/products' || location.pathname === '/') && (
          <div className="relative mx-4">
            <input
              type="text"
              placeholder="Search Products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-gray-200 p-2 rounded text-gray-800 w-96 outline-none pl-10"
            />
            <span className="absolute left-2 top-2 text-gray-500">
              <i className="fa fa-search"></i>
            </span>
          </div>
        )}

        <div className="space-x-4 flex items-center">
          {showLinks()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
