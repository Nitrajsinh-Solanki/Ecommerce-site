const Order = require('../models/Order');
const Product = require('../models/Product');

// Place an order
exports.placeOrder = async (req, res) => {
    try {
        const { products } = req.body; 
        const user = req.user.id; 
        let totalAmount = 0;
        const orderProducts = [];

        for (const item of products) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
            }
            if (product.quantity < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for product: ${product.name}` });
            }

           
            orderProducts.push({
                product: item.productId,
                quantity: item.quantity,
            });
            totalAmount += product.price * item.quantity;
        }

    
        for (const item of products) {
            const product = await Product.findById(item.productId);
            product.quantity -= item.quantity;
            await product.save(); 
        }

    
        const order = new Order({
            user,
            products: orderProducts,
            totalAmount,
        });

        await order.save();
        res.status(201).json({
            message: "Order placed successfully",
            order,
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Get all orders (Admin only)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email'); 
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body; 
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status; 
        await order.save(); 
        res.status(200).json({ message: "Order status updated successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
