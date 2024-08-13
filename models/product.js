const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productId: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Product', ProductSchema);
