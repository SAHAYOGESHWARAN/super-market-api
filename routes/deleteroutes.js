const express = require('express');
const { deleteFromList } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();



module.exports = router;
