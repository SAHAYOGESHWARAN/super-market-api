const express = require('express');
const { addProduct, getProducts, getProductById, updateProduct } = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Admin adds a new product (protected route)
router.post('/add', protect, addProduct);

// Admin updates a product (protected route)
router.put('/update/:id', protect, updateProduct);

// User views all products
router.get('/', getProducts);

// User views a single product by ID
router.get('/:id', getProductById);

module.exports = router;
