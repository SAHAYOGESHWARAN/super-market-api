const Product = require('../models/product');

// Update a product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.updatedBy = req.user ? req.user._id : req.admin._id; // Capture the user/admin who made the update
    product.updatedAt = Date.now(); // Update the timestamp

    const updatedProduct = await product.save();

    res.json({
        _id: updatedProduct._id,
        name: updatedProduct.name,
        price: updatedProduct.price,
        productId: updatedProduct.productId,
        updatedBy: updatedProduct.updatedBy,
        updatedAt: updatedProduct.updatedAt,
    });
};

module.exports = { addProduct, getProducts, getProductById, updateProduct };
