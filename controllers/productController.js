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
        // Find the product by its productId (ensure that productId is a unique identifier in your schema)
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
// Add a product to the user's list
const addToList = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id; // Assuming user is authenticated and their ID is in req.user

    try {
        const product = await Product.findOne({ productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if product already in the user's list
        const alreadyInList = user.productList.find(
            (item) => item.productId.toString() === product._id.toString()
        );

        if (alreadyInList) {
            return res.status(400).json({ message: 'Product already in your list' });
        }

        // Add product to the user's list
        user.productList.push({
            productId: product._id,
            name: product.name,
            price: product.price,
        });

        await user.save();

        res.status(201).json({ message: 'Product added to your list', productList: user.productList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


//delete 

const deleteFromList = async (req, res) => {
    const userId = req.user._id; // Assuming user is authenticated
    const { productId } = req.params; // This will get the productId from the URL

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Filter out the product from the user's list
        user.productList = user.productList.filter(
            (item) => item.productId.toString() !== productId
        );

        await user.save();

        res.json({ message: 'Product removed from your list', productList: user.productList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
module.exports = { addToList };

// Export all functions
module.exports = { addProduct, getProducts, getProductById, updateProduct,deleteFromList,addToList };
