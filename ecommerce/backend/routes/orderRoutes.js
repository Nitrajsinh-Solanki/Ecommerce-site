const express = require('express');
const { placeOrder, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { authMiddleware, adminMiddleware ,shopperMiddleware} = require('../middleware/authMiddleware');

const router = express.Router();

// Place an order (Authenticated users only)
router.post('/place', authMiddleware, placeOrder,shopperMiddleware);

// Get all orders (Admin only)
router.get('/admin', authMiddleware, adminMiddleware, getAllOrders);

// Update order status (Admin only)
router.put('/admin/status', authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;
