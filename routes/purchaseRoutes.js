const express = require('express');
const { purchaseProduct } = require('../controllers/purchaseController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// User purchases a product (protected route)
router.post('/', protect, purchaseProduct);

module.exports = router;
