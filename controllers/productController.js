const Product = require('../models/product');
const User = require('../models/user'); // Import User model
const Admin = require('../models/admin'); // Import Admin model (if applicable)
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

// Get a single product by ID
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params; // Get the product ID from URL parameters

    // Check if the provided id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }

    try {
        // Find the product by the ID from URL parameters
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update product details
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;

        // Assuming req.user or req.admin is already populated
        product.updatedBy = req.user ? req.user._id : req.admin._id;
        product.updatedAt = Date.now();

        // Save the updated product
        const updatedProduct = await product.save();

        // Send response with updated product details
        res.json({
            _id: updatedProduct._id,
            name: updatedProduct.name,
            price: updatedProduct.price,
            productId: updatedProduct.productId,
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
