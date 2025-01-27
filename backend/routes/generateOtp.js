const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Order = require('../models/order');

// Utility function to hash OTP
const hashOtp = async (otp) => {
  const saltRounds = 10;
  return bcrypt.hash(otp, saltRounds);
};

router.get('/:orderId', async (req, res) => {

    const orderId = req.params.orderId;
    console.log("orderId", orderId);
    
    const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();
    
    const newOtp = generateOtp();
    console.log(newOtp.toString());
    const hashValue = await hashOtp(newOtp.toString());
    console.log(hashValue);
    
    await Order.findByIdAndUpdate(orderId, { otp: hashValue });
    
    res.status(200).json({ otp: newOtp });

});

module.exports = router;