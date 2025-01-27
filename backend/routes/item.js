// Required modules
const express = require('express');

// Router
const router = express.Router();

// import model
const Order = require('../models/order');
const Item = require('../models/item');
const User = require('../models/user');

// import middleware
const authMiddleware = require('../middleware/auth');

// Get item details and sellerName
router.get('/:itemId',authMiddleware,  (req, res) => {
    const itemId = req.params.itemId; // get the itemId from the url

    // Find the item by ID
    Item.findById(itemId)
    .then(item => {
      if (item) {
        const itemData = item; 

        // get the sellerName 
        User.findById(itemData.sellerID)
        .then(user => {
          if (user) {
            sellerName = user.name;
            res.json({ itemData, sellerName });
          } 
        })
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    });

  });

// Add item to cart
router.post('/:itemId', async (req, res) => {
  const itemId = req.params.itemId; // get the userId from the url
  const { userId, item } = req.body; // get the userId and item from the request body

  // Check if the item exists inCart or Pending Orders
  const existingOrder = await Order.findOne({
    item_id : itemId,
    buyerId: userId,
  });

  // Check if the item is added by the seller
  if (item.sellerID === userId) {
    return res.status(200).json({ message: 'You cannot add your own item to cart.' });
  }
  // if item already bought by the user
  if (existingOrder) {
    return res.status(200).json({ message: 'Item already in cart.' });
  }

  // Create a new order if no existing item is found
  const order = new Order({

    item_id: item._id,
    item_image: "path_to_image.jpg",
    item_description: item.description,
    item_originalPrice: item.originalPrice,
    item_sellingPrice: item.sellingPrice,
    item_category: item.category,

    buyerId: userId,
    sellerId: item.sellerID,
    status: 'inCart',
    otp: null,
  });

  await order.save();

  res.status(200).json({ message: 'Item added to cart successfully.' });
});

module.exports = router;