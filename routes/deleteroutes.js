const express = require('express');
const { deleteFromList } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to delete a product from the user's list
router.delete('/list/:productId', protect, deleteFromList);

module.exports = router;
