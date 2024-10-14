import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/userSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      const token = resultAction.payload?.token;
      const user = resultAction.payload?.user;

      if (!token || !user) {
        console.error('Invalid login response. Token or user not found.');
        return;
      }

      // Save token and user details in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Navigate to the respective role page
      if (user.role === 'Shopper') {
        navigate('/products');
      } else if (user.role === 'Seller') {
        navigate('/seller');
      } else if (user.role === 'Admin') {
        navigate('/admin');
      }
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl my-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-blue-600 mb-4 p-2 border border-blue-400 rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-blue-600 mb-4 p-2 border border-blue-400 rounded-lg"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
     
    </div>
  );
};

export default LoginForm;
