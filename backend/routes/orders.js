// Require Modules
const express = require('express');
const bcrypt = require('bcrypt');

// Router
const router = express.Router();

// import models
const Order = require('../models/order');
const Notification = require('../models/notification');
const User = require('../models/user');

// import middleware
const authMiddleware = require('../middleware/auth');

// Get all the Orders in the Database
router.get('/:userid', authMiddleware, async (req, res) => {
   Order.find().then((orders) => { res.json(orders); });
});

 
router.post('/:userid', async (req, res) => {
  const userId = req.params.userid; // Get the buyer's userId from the URL

  try {
    // Find the buyer's details
    const buyer = await User.findById(userId);
    if (!buyer) {
      return res.status(404).send("Buyer not found");
    }

    // Find all orders that are in the cart for this user
    const ordersInCart = await Order.find({ buyerId: userId, status: 'inCart' });

    // Extract all unique item_ids from these orders
    const itemIds = ordersInCart.map(order => order.item_id);

    // Delete orders with the same item_id but different buyerId
    await Order.deleteMany({ item_id: { $in: itemIds }, buyerId: { $ne: userId } });

    // Update the status of this user's cart items to 'pending'
    await Order.updateMany({ buyerId: userId, status: 'inCart' }, { status: 'pending' });

    // Create notifications for the sellers
    const notifications = ordersInCart.map(order => ({
      userId: order.sellerId, // Notify the seller
      description: `Your item "${order.item_description}" has been bought by ${buyer.name}. Contact: ${buyer.contactNumber || "Not provided"}.`
    }));

    // Insert notifications into the database
    await Notification.insertMany(notifications);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
