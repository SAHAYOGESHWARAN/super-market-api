const express = require('express');
const { addProduct, getProducts, getProductById, updateProduct } = require('../controllers/productController');
const protect = require('../middleware/authMiddleware'); // Ensure this middleware is used for authentication

const router = express.Router();

// Admin updates a product (protected route)
router.put('/update/:id', protect, updateProduct);

module.exports = router;
