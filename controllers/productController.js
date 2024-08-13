const Product = require('../models/product');
const User = require('../models/user');
const Admin = require('../models/admin');
const mongoose = require('mongoose');

// Add a new product
const addProduct = async (req, res) => {
    const { name, price, productId } = req.body;

    const productExists = await Product.findOne({ productId });
    if (productExists) {
        return res.status(400).json({ message: 'Product ID already exists' });
    }

    const product = await Product.create({
        name,
        price,
        productId,
    });

    if (product) {
        res.status(201).json({
            productId: product.productId,
            name: product.name,
            price: product.price,
        });
    } else {
        res.status(400).json({ message: 'Invalid product data' });
    }
};

// Get all products
const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

// Get a single product by productId
const getProductById = async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findOne({ productId });

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    const { productId } = req.params;

    // Check if the provided productId is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }

    try {
        // Find the product by productId
        const product = await Product.findOne({ productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update product details
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;

        // Assuming req.user or req.admin is already populated
        product.updatedBy = req.user ? req.user._id : req.admin._id;
        product.updatedAt = Date.now();

        const updatedProduct = await product.save();

        res.json({
            productId: updatedProduct.productId,
            name: updatedProduct.name,
            price: updatedProduct.price,
            updatedBy: {
                id: updatedProduct.updatedBy,
                name: req.user ? req.user.name : req.admin.name // Adjust based on how you're storing/updating user/admin data
            },
            updatedAt: updatedProduct.updatedAt,
        });
    } catch (error) {
        return res.status(400).json({ message: 'Error updating product', error: error.message });
    }
};

// Export all functions
module.exports = { addProduct, getProducts, getProductById, updateProduct };
