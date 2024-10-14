
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import Navbar from '../components/Navbar';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false); // State to manage login prompt visibility

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        if (Array.isArray(response.data)) {
          setProducts(response.data);
          setFilteredProducts(response.data); 
        } else {
          setError('Invalid data format received from server.');
        }
      } catch (error) {
        setError('Error fetching products from server.');
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Update filtered products based on search query
  const handleSearch = (query) => {
    if (query) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); 
    }
  };

  const handleBuyNow = () => {
    setShowLoginPrompt(true); 
  };

  const closeLoginPrompt = () => {
    setShowLoginPrompt(false); 
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} /> 
      <div className="container mx-auto mt-8 mb-20">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Products</h2>
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product._id} className="border p-2 rounded-lg shadow-lg">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-contain mb-2 bg-center hover:cursor-pointer transform hover:scale-110 transition duration-300"
                  />
                  <h3 className="text-lg font-semibold text-center">{product.name}</h3>
                  <p className="text-gray-600 text-center">${product.price}</p>
                  <button
                    className="bg-blue-600 text-white py-2 px-4 mt-4 rounded text-center w-full hover:cursor-pointer hover:bg-blue-800"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center col-span-3">No products available.</p>
            )}
          </div>
        )}
      </div>


      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="mb-6">You need to log in to buy a product.</p>
            <div className="space-x-4">
              <button
                onClick={closeLoginPrompt}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                Close
              </button>
              <Link to="/login">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
                  Go to Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;