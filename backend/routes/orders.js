// Require Modules
const express = require('express');
const bcrypt = require('bcrypt');

// Router
const router = express.Router();

// import models
const Order = require('../models/order');

// import middleware
const authMiddleware = require('../middleware/auth');

// Get all the Orders in the Database
router.get('/:userid', authMiddleware, async (req, res) => {
   Order.find().then((orders) => { res.json(orders); });
});

 
// Place Order for all the Items in Cart
router.post('/:userid', (req, res) => {
  const userId = req.params.userid; // Get the userId from the url

  // Update the status of all cart items to 'completed'
  Order.updateMany(
    { buyerId: userId, status: 'inCart' },
    { status: 'pending' },
  ).then(() => res.sendStatus(200));
});

module.exports = router;
