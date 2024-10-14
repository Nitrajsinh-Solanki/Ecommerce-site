import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import SellerPage from './pages/SellerPage';
import { fetchProducts } from './redux/productSlice';
import AdminPage from './pages/AdminPage';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/seller" element={<SellerPage />} />
          <Route path="/admin" element={<AdminPage />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
