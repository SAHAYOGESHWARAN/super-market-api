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
// Endpoint to view update history
router.route('/history/:productId').get(protect, async (req, res) => {
    try {
        const product = await Product.findOne({ productId: req.params.productId }).populate('updateHistory.updatedBy');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({
            productId: product.productId,
            updateHistory: product.updateHistory,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


module.exports = router;
