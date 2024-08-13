const express = require('express');
const { addProduct, getProducts, getProductById, updateProduct } = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', protect, addProduct);
router.get('/', getProducts);
router.get('/:productId', getProductById);
router.put('/update/:productId', protect, updateProduct);

module.exports = router;
