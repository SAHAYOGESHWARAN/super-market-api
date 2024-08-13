const express = require('express');
const { addToList } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to add products to the user's list
router.post('/list', protect, addToList);

module.exports = router;
