const express = require('express');
const { addProduct, getProducts, getProductById, updateProduct } = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Route to add a new product
router.post('/add', protect, addProduct);

// Route to get all products
router.get('/', getProducts);

// Route to get a product by productId
router.get('/:productId', getProductById);

// Route to update a product by productId
router.put('/update/:productId', protect, updateProduct);

module.exports = router;
