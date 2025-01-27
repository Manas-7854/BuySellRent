const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();

// import model
const Order = require('../models/order');
const Item = require('../models/item');

router.post('/:orderId',async (req, res) => {

    const orderId = req.params.orderId;
    
    const enteredOtp = req.body.enteredOtp;
    if (!enteredOtp) {
        console.log("Please enter OTP");
        return res.status(201).json({ message: 'Please enter OTP' });
    }
    console.log("orderId", orderId);
    console.log("enteredOtp", enteredOtp.toString()); 

    const order = await Order.findOne({ _id: orderId });
    console.log(order);

    
    const match = await bcrypt.compare(enteredOtp.toString(), order.otp);

    if (!match) {
        console.log("Incorrect OTP");
        return res.status(201).json({ message: 'Incorrect OTP' });
    }

    console.log("the otp is correct");
    Order.updateOne(
        { _id: order._id },
        { status: 'completed' },
      ).then( async () =>{
        
      // Assuming order.item_id contains the item_id you want to delete
      const itemId = order.item_id;
      
      // Delete the item from the Item model using item_id
      const result = await Item.deleteOne({ _id: itemId });
    
      if (result.deletedCount === 0) {
        console.log("Item not found");
      } else {
        console.log("Item deleted successfully");
      }
    
      // Send a success response
      res.sendStatus(200);
    
    });

    
        
    });
    
module.exports = router;