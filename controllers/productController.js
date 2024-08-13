const Product = require('../models/product');
const User = require('../models/user'); // Import User model
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
            _id: product._id,
            name: product.name,
            price: product.price,
            productId: product.productId,
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
    const product = await Product.findOne({ productId: req.params.productId });

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// Update a product by productId
const updateProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        // Find the product by its productId
        const product = await Product.findOne({ productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update the product details
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;

        // Capture who updated the product
        product.updatedBy = req.user ? req.user._id : null;
        product.updatedAt = Date.now();

        // Save the updated product
        const updatedProduct = await product.save();

        // Respond with the updated product details
        res.json({
            _id: updatedProduct._id,
            name: updatedProduct.name,
            price: updatedProduct.price,
            productId: updatedProduct.productId,
            updatedBy: {
                id: updatedProduct.updatedBy,
                name: req.user ? req.user.name : "Unknown"
            },
            updatedAt: updatedProduct.updatedAt,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Export all functions
module.exports = { addProduct, getProducts, getProductById, updateProduct };
