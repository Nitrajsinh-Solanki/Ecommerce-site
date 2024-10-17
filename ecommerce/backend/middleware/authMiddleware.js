const jwt = require('jsonwebtoken');

// Authentication middleware
exports.authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Role-based access control middleware
exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Access denied, admin only' });
  }
  next();
};

exports.sellerMiddleware = (req, res, next) => {
  if (req.user.role !== 'Seller') {
    return res.status(403).json({ message: 'Access denied, seller only' });
  }
  next();
};


exports.shopperMiddleware = (req, res, next) => {
  if (req.user.role !== 'Shopper') {
    return res.status(403).json({ message: 'Access denied, shoppers only' });
  }
  next();
};
