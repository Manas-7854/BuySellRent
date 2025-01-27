// Model for Items Collection

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({

    sellerID: String,
    description: String,
    originalPrice: Number,
    sellingPrice: Number,
    category: String
    
}, { timestamps: true });

const Item = mongoose.model('item', itemSchema);

module.exports = Item;