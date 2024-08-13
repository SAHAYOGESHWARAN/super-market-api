const express = require('express');
const { updateProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to update product
router.put('/update/:productId', protect, updateProduct);

module.exports = router;
