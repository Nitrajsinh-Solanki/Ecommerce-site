import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]); 
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Shopper',
    });
    const [isAddUserFormVisible, setAddUserFormVisible] = useState(false);
    const [error, setError] = useState(null);
    const [userSearchQuery, setUserSearchQuery] = useState(''); 
    const [orderSearchQuery, setOrderSearchQuery] = useState(''); 

 
    const [isEditRoleDialogOpen, setEditRoleDialogOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [newRole, setNewRole] = useState('Shopper');

   
    const [isDeleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    useEffect(() => {
        fetchUsers();
        fetchOrders();
    }, []);

    useEffect(() => {

        setFilteredUsers(
            users.filter(user => 
                user.name.toLowerCase().includes(userSearchQuery.toLowerCase())
            )
        );
    }, [userSearchQuery, users]);

    useEffect(() => {

        setFilteredOrders(
            orders.filter(order => 
                order._id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
                (order.user && order.user.name.toLowerCase().includes(orderSearchQuery.toLowerCase()))
            )
        );
    }, [orderSearchQuery, orders]);

    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5000/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
            setFilteredUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users. Please try again later.');
        }
    };

    const fetchOrders = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5000/api/orders/admin', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(response.data);
            setFilteredOrders(response.data); 
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to fetch orders. Please try again later.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleUserSearchChange = (e) => {
        setUserSearchQuery(e.target.value); 
    };

    const handleOrderSearchChange = (e) => {
        setOrderSearchQuery(e.target.value); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                'http://localhost:5000/api/admin/users/add',
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchUsers();
            setAddUserFormVisible(false);
            setFormData({ name: '', email: '', password: '', role: 'Shopper' });
        } catch (error) {
            console.error('Error adding user:', error);
            setError('Failed to add user. Please try again later.');
        }
    };

    const handleDelete = async (userId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Failed to delete user. Please try again later.');
        }
    };

    const confirmDelete = () => {
        handleDelete(userIdToDelete); 
        setDeleteConfirmDialogOpen(false);
    };

    const handleEditRole = (userId) => {
        setCurrentUserId(userId);
        setEditRoleDialogOpen(true);
    };

    const confirmRoleChange = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(
                `http://localhost:5000/api/admin/users/${currentUserId}`,
                { role: newRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchUsers();
            setEditRoleDialogOpen(false); 
        } catch (error) {
            console.error('Error updating user role:', error);
            setError('Failed to update user role. Please try again later.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="admin-page flex">
                <div className="users-section w-1/2 p-4 border-r overflow-auto" style={{ height: 'calc(100vh - 80px)' }}>
                    <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

                    <input
                        type="text"
                        placeholder="Search by username"
                        value={userSearchQuery}
                        onChange={handleUserSearchChange} 
                        className="border rounded p-2 mb-4 w-full"
                    />

                    <button
                        onClick={() => setAddUserFormVisible(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    >
                        Add User
                    </button>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <div className="user-list mb-6">
                        {filteredUsers.map((user) => ( 
                            <div key={user._id} className="mb-4 p-4 border rounded shadow">
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Role:</strong> {user.role}</p>
                                <button
                                    onClick={() => handleEditRole(user._id)} 
                                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    Edit Role
                                </button>
                                <button
                                    onClick={() => {
                                        setUserIdToDelete(user._id); 
                                        setDeleteConfirmDialogOpen(true); 
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    {isAddUserFormVisible && (
                        <div className="add-user-form fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded shadow-lg">
                                <h3 className="text-xl font-bold mb-4 w-96">Add New User</h3>
                                <form onSubmit={handleSubmit} className="flex flex-col">
                                    <label className="mb-2">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="border p-2 mb-4 rounded"
                                    />
                                    <label className="mb-2">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="border p-2 mb-4 rounded"
                                    />
                                    <label className="mb-2">Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="border p-2 mb-4 rounded"
                                    />
                                    <label className="mb-2">Role:</label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                        className="border p-2 mb-4 rounded"
                                    >
                                        <option value="Shopper">Shopper</option>
                                        <option value="Seller">Seller</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                    <div className="flex justify-between">
                                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setAddUserFormVisible(false)}
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                 
                    {isEditRoleDialogOpen && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded shadow-lg text-center">
                                <h3 className="text-xl font-bold mb-4 text-center">Edit User Role</h3>
                                <select
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                    className="border p-2 mb-4 rounded text-center"
                                >
                                    <option value="Shopper">Shopper</option>
                                    <option value="Seller">Seller</option>
                                    <option value="Admin">Admin</option>
                                </select>
                                <div className="flex justify-between">
                                    <button
                                        onClick={confirmRoleChange}
                                        className="bg-green-500 text-white px-4 py-2 rounded mr-4"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={() => setEditRoleDialogOpen(false)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    
                    {isDeleteConfirmDialogOpen && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
                                <p>Are you sure you want to delete this user?</p>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => setDeleteConfirmDialogOpen(false)}
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="orders-section w-1/2 p-4 overflow-auto" style={{ height: 'calc(100vh - 80px)' }}>
                    <h2 className="text-2xl font-bold mb-4">View Orders</h2>

                    <input
                        type="text"
                        placeholder="Search by Order ID or User Name"
                        value={orderSearchQuery}
                        onChange={handleOrderSearchChange}
                        className="border rounded p-2 mb-4 w-full"
                    />

                    <div className="order-list">
                        {filteredOrders.length > 0 ? ( 
                            filteredOrders.map((order) => (
                                <div key={order._id} className="mb-4 p-4 border rounded shadow">
                                    <p><strong>Order ID:</strong> {order._id}</p>
                                    <p><strong>User:</strong> {order.user?.name || 'Anonymous'}</p>
                                    <p><strong>Total:</strong> ${order.totalAmount}</p>
                                    <p><strong>Status:</strong> {order.status || 'Pending'}</p>
                                </div>
                            ))
                        ) : (
                            <p>No orders found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
