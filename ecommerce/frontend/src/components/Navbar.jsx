import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

const Navbar = ({ onSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDialog, setShowDialog] = useState(false); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

 
  const handleAllProductsClick = (e) => {
    if (!token && (location.pathname === '/' || location.pathname ==="/login" || location.pathname ==="/register")) {
      e.preventDefault(); 
      setShowDialog(true); // Show dialog if not logged in
    }
  };

  // Close the dialog
  const closeDialog = () => {
    setShowDialog(false);
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
          {/* "My Products" Link */}
          <Link
            to="/products"
            className="text-white hover:underline"
            onClick={handleAllProductsClick}
          >
            View Products
          </Link>

          {showLinks()}
        </div>
      </div>

      {/* Dialog Box */}
      {showDialog && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    {/* Dialog Box */}
    <div className="bg-white p-6 rounded shadow-lg z-50">
      <p className="text-gray-800 mb-4">You need to log in to view products.</p>
      <div className="flex justify-end">
        <button
          onClick={closeDialog}
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
        >
          Cancel
        </button>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>

    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"></div>
  </div>
)}

    </nav>
  );
};

export default Navbar;
