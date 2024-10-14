const express = require('express');
const { placeOrder, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Place an order (Authenticated users only)
router.post('/place', authMiddleware, placeOrder);

// Get all orders (Admin only)
router.get('/admin', authMiddleware, adminMiddleware, getAllOrders);

// Update order status (Admin only)
router.put('/admin/status', authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;
