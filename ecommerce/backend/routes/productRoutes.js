const express = require('express');
const { createProduct, getAllProducts, updateProduct, deleteProduct, purchaseAsAnonymous,getSellerProducts } = require('../controllers/productController');
const { authMiddleware, sellerMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/anonymous-purchase', purchaseAsAnonymous);

router.use(authMiddleware);
router.use(sellerMiddleware);

router.post('/add', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/seller', authMiddleware, getSellerProducts,sellerMiddleware);

module.exports = router;
