const express = require('express');
const { addProduct, getProducts, getProductById } = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Admin adds a new product (protected route)
router.post('/add', protect, addProduct);

// User views all products
router.get('/', getProducts);

// User views a single product by ID
router.get('/:id', getProductById);

module.exports = router;
