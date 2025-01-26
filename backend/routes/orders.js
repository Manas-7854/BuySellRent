const express = require('express');
const router = express.Router();

// import models
const Order = require('../models/order');

router.get('/:userid', async (req, res) => {
  const userId = parseInt(req.params.userid);

    // Find orders where userId matches buyerId or sellerId, and status is pending or completed
  Order.find().then((orders) => { res.json(orders); });

});

// place all the orders in the cart
router.post('/:userid', (req, res) => {
  const userId = req.params.userid; // Get the userId from the route parameter
  const cartItems = req.body.cartItems; // Get the cart items from the request body

  console.log(cartItems);

  const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();
  // Update the status of all cart items to 'completed'
  Order.updateMany(
    { buyerId: userId, status: 'inCart' },
    { status: 'pending', otp: generateOtp() },
  ).then(() => res.sendStatus(200));
});

module.exports = router;
