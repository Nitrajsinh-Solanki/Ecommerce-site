import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import axios from 'axios';
import Confetti from 'react-confetti'; 
import Navbar from '../components/Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProductPage = () => {
  const dispatch = useDispatch();
  const { products, status, error: productError } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  

  const productRefs = useRef([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        if (Array.isArray(response.data)) {
          dispatch(fetchProducts(response.data));
        } else {
          console.error('Invalid data format received from server.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProducts();
  }, [dispatch]);

  useEffect(() => {
   
    productRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 }, 
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 75%', 
            toggleActions: 'play none none none', 
          },
        }
      );
    });
  }, [products]);

  const handleSearch = (query) => {
    setSearchQuery(query); 
  };

  const handleOrder = (productId) => {
    if (!user || !user.token) {
      alert('You must be logged in to place an order.');
      return;
    }
    setSelectedProduct(productId);
  };

  const confirmOrder = async () => {
    if (!user || !user.token) {
      alert('You must be logged in to place an order.');
      return;
    }

    try {
      const selectedProductData = products.find((product) => product._id === selectedProduct);
      if (!selectedProductData) {
        console.error('Product not found in the products array:', products);
        throw new Error('Product not found');
      }

      const orderData = {
        user: user._id,
        products: [{
          productId: selectedProductData._id,
          quantity: quantity,
        }],
        totalAmount: selectedProductData.price * quantity,
      };

      const response = await axios.post(
        'http://localhost:5000/api/orders/place',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.data) {
        alert('Order placed successfully!');
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 7000);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order: ' + (error.response?.data.message || 'An unknown error occurred'));
    } finally {
      setSelectedProduct(null);
      setQuantity(1);
    }
  };

 
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar onSearch={handleSearch} /> 

      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={1000}
          gravity={0.1}
          recycle={false}
        />
      )}
      <div className="text-center py-4 text-white">
        <h1 className="text-3xl text-gray-900 font-bold">E-commerce site product page</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {status === 'loading' && <p>Loading products...</p>}
        {status === 'failed' && <p className="text-red-500">{productError}</p>}
        {status === 'succeeded' &&
          filteredProducts.map((product, index) => (
            <div 
              key={product._id} 
              ref={(el) => (productRefs.current[index] = el)} 
              className="bg-white shadow-md rounded-lg p-4 text-center"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-contain mb-2 bg-center hover:cursor-pointer transform hover:scale-110 transition duration-300"
              />
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">${product.price}</p>
              <button
                onClick={() => handleOrder(product._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
              >
                Buy Now
              </button>
            </div>
          ))}
      </div>
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">Confirm Order</h2>
          
            {products && selectedProduct && (
              <>
                {products.map((product) => {
                  if (product._id === selectedProduct) {
                    return (
                      <div key={product._id}>
                        <p>Product Name: {product.name}</p>
                        <p>Total Amount: ${product.price * quantity}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </>
            )}
            <label className="block my-4">
              Quantity:
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                min="1" 
              />
            </label>
            <button
              onClick={confirmOrder}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Place Order
            </button>
            <button
              onClick={() => setSelectedProduct(null)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
