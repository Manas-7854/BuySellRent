// Required modules
const express = require('express');
const bcrypt = require('bcrypt');

// Router instance
const router = express.Router();

// Import model
const Order = require('../models/order');

// Utility function to hash OTP
const hashOtp = async (otp) => {
  const saltRounds = 10;
  return bcrypt.hash(otp, saltRounds);
};

// Generate OTP for the order
router.get('/:orderId', async (req, res) => {

    const orderId = req.params.orderId; // get order id from the url
    
    const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();
    const newOtp = generateOtp();
 
    await Order.findByIdAndUpdate(orderId, { otp: await hashOtp(newOtp.toString()) }).
    then(() => {
        res.status(200).json({ otp: newOtp });
    });

});

module.exports = router;