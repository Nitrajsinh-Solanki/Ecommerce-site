const Product = require('../models/Product');

//add a new product 
exports.createProduct = async (req, res) => {
  const { name, price, imageUrl, quantity } = req.body;


  if (!name || !price || !quantity) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  const sellerId = req.user.id;

  try {
    const newProduct = new Product({
      name,
      price,
      imageUrl,
      quantity,
      Seller: sellerId,  
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

exports.purchaseAsAnonymous = async (req, res) => {
  const { products } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ message: 'No products provided' });
  }

  try {
    const anonymousPurchase = {
      anonymousId: 'anonymous-' + Date.now(),
      products,
    };

    res.status(201).json({ message: 'Purchase successful for anonymous user', anonymousPurchase });
  } catch (error) {
    res.status(500).json({ message: 'Error processing purchase', error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.Seller.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { name, imageUrl, price, quantity } = req.body;
    product.name = name || product.name;
    product.imageUrl = imageUrl || product.imageUrl;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};


// Get products for a specific seller
exports.getSellerProducts = async (req, res) => {
  try {
    const sellerId = req.user.id || req.user._id; 
    console.log('Fetching products for seller:', sellerId);

    const products = await Product.find({ Seller: sellerId });

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching seller products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};