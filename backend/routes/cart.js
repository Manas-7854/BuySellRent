const express = require('express');
const router = express.Router();

// import models
const Order = require('../models/order');

// Get cart items by userId
router.get('/:userid', (req, res) => {
  const userId = req.params.userid; // Get the userId from the route parameter

  Order.find(
    { buyerId: userId, status: 'inCart' },
  ).then(orders => res.json(orders));

});

// place all the orders in the cart
router.post('/:userid', (req, res) => {
  const userId = req.params.userid; // Get the userId from the route parameter
  const cartItems = req.body.cartItems; // Get the cart items from the request body

  console.log(cartItems);

  // Update the status of all cart items to 'completed'
  Order.updateMany(
    { buyerId: userId, status: 'inCart' },
    { status: 'pending' },
  ).then(() => res.sendStatus(200));
});

// if single item deletion is not possible the clear the whole cart

module.exports = router;
