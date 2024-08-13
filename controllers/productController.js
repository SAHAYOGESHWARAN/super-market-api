const Product = require('../models/product');
const User = require('../models/user'); // Import User model
const Admin = require('../models/admin'); // Import Admin model (if applicable)

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

    // Identify who is updating the product
    const updater = req.user ? await User.findById(req.user._id) : await Admin.findById(req.admin._id);
    product.updatedBy = updater._id;
    product.updatedAt = Date.now();

    const updatedProduct = await product.save();

    res.json({
        _id: updatedProduct._id,
        name: updatedProduct.name,
        price: updatedProduct.price,
        productId: updatedProduct.productId,
        updatedBy: {
            id: updater._id,
            name: updater.name, // Assuming the User/Admin model has a 'name' field
        },
        updatedAt: updatedProduct.updatedAt,
    });
};

module.exports = { addProduct, getProducts, getProductById, updateProduct };
