import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Shopper'); 
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); 

        try {
            console.log('Sending data:', { name, email, password, role });
            const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
            
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Registration Error:', error);
            if (error.response) {
                setError(error.response.data.message || 'Registration failed. Please try again.');
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl my-4">Register</h2>
            <form onSubmit={handleRegister} className="flex flex-col">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="outline-blue-600 mb-4 p-2 border border-blue-400 rounded-lg"
                    required
                />
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
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="outline-blue-600 mb-4 p-2 border border-blue-400 rounded-lg"
                    required
                >
                    <option value="Shopper">Shopper</option>  
                    <option value="Seller">Seller</option>    
                    <option value="Admin">Admin</option>     
                </select>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">Register</button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <p className="mt-4">
                Already have an account?{' '}
                <button
                    onClick={() => navigate('/login')} 
                    className="text-blue-500 hover:underline"
                >
                    Login here
                </button>
            </p>
        </div>
    );
};

export default RegisterForm;
