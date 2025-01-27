// Model for Orders Collection

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({


    item_id: String,
    item_image: String,
    item_description: String,
    item_originalPrice: Number,
    item_sellingPrice: Number,
    item_category: String,

    buyerId: String,
    sellerId: String,
    status: String,
    otp: String,

}, { timestamps: true });

const Order = mongoose.model('order', orderSchema);

module.exports = Order;