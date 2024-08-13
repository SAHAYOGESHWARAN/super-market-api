const Product = require('../models/product');
const User = require('../models/user');

// Purchase a product
const purchaseProduct = async (req, res) => {
    const { productId } = req.body;
    const product = await Product.findOne({ productId });

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    // Implement purchase logic, e.g., decrease stock, create an order, etc.
    // For now, let's assume the purchase is successful.

    res.json({ message: `Purchase successful! You bought ${product.name} for $${product.price}.` });
};

module.exports = { purchaseProduct };
