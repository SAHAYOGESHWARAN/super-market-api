const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    productId: {
        type: String,
        required: true,
        unique: true,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    updatedAt: {
        type: Date,
    },
    updateHistory: [
        {
            updatedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            name: String,
            price: Number,
            updatedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
