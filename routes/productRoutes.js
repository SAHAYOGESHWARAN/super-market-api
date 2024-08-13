const express = require('express');
const { addProduct, getProducts, getProductById, updateProduct,deleteFromList } = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', protect, addProduct);
router.get('/', getProducts);
router.get('/:productId', getProductById);
router.put('/update/:productId', protect, updateProduct);
// Route to delete a product from the user's list
router.delete('/list/:productId', protect, deleteFromList);



module.exports = router;
