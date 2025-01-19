const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const orderSchema = new Schema({

    item:
    {
        id: Number,
        image: String,
        description: String,
        originalPrice: Number,
        sellingPrice: Number,
        category: String
    },
    buyerId: String,
    sellerId: String,
    status: String,
    otp: Number

}, { timestamps: true });

const Order = mongoose.model('order', orderSchema);

module.exports = Order;