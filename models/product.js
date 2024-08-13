const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productId: { type: String, required: true, unique: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    updatedAt: { type: Date, default: Date.now }, // Timestamp of the update
});

module.exports = mongoose.model('Product', ProductSchema);
