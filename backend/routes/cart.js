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

  // res.json({ message: 'Cart route' });

  // console.log('cartItems:', cartItems);

  // if (cartItems.length > 0) {
  //   res.json(userCartItems); // Return the cart items for that user
  // } else {
  //   res.status(200).json({ error: 'No items found for this user' });
  // }
});

// place all the orders in the cart

// if single item deletion is not possible the clear the whole cart

module.exports = router;
