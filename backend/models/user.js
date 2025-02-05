// Model for Users Collection

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:
    {
        type: String,
        required: true
    },
    lastName:
    {
        type:String
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    age:
    {
        type: Number,
    },
    contactNumber:
    {
        type: Number,
    },  
    password:
    {
        type: String,
        required: true
    },

}, { timestamps: true});

const User = mongoose.model('user', userSchema);

module.exports = User;
