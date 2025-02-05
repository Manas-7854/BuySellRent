// Required Libraries
const express = require('express');

// Router
const router = express.Router();

// import models
const Order = require('../models/order');

// import middleware
const authMiddleware = require("../middleware/auth");

// Get cart items for a specific user
router.get('/:userid',authMiddleware,  (req, res) => {
  const userId = req.params.userid; // Get the userId from the route parameter

  Order.find(
    { buyerId: userId, status: 'inCart' },
  ).then(orders => res.json(orders));

});

// remove item from cart
router.post('/:userid', (req, res) => {
  const userId = req.params.userid; // Get the userId from the route parameter
  const orderId = req.body.orderId; // Get the orderId from the request body

  console.log(userId, orderId);
  Order.findByIdAndDelete(orderId).then(() => {
    Order.find(
      { buyerId: userId, status: 'inCart' },
    ).then(res.status(200).json("Order removed successfully"));
  });
});

module.exports = router;
