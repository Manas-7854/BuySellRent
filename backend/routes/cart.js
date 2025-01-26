const express = require('express');
const router = express.Router();

// import models
const Order = require('../models/order');

// import middleware
const authMiddleware = require("../middleware/auth");

// Get cart items by userId
router.get('/:userid',authMiddleware,  (req, res) => {

  const userId = req.params.userid; // Get the userId from the route parameter

  Order.find(
    { buyerId: userId, status: 'inCart' },
  ).then(orders => res.json(orders));

});

// remove items from cart
router.post('/:userid', (req, res) => {
  const userId = req.params.userid; // Get the userId from the route parameter
  const orderId = req.body.orderId; // Get the orderId from the request body

  console.log("orderId", orderId);

  Order.findByIdAndDelete(orderId).then(() => {
    Order.find(
      { buyerId: userId, status: 'inCart' },
    ).then(res.status(200).json("Order removed successfully"));
  });
});

// if single item deletion is not possible the clear the whole cart

module.exports = router;
