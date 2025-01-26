const express = require('express');
const router = express.Router();

// import model
const Order = require('../models/order');
const Item = require('../models/item');
const User = require('../models/user');

// Get item by ID
router.get('/:itemId', (req, res) => {
    const itemId = req.params.itemId;

    Item.findById(itemId)
    .then(item => {
      if (item) {
        // Store the item data in a variable (for example, an object or a separate variable)
        const itemData = item; // Storing the item data in a variable
  
        console.log("itemData", itemData);
        console.log("itemData.sellerID", itemData.sellerID);

        // get the username using the sellerID
        User.findById(itemData.sellerID)
        .then(user => {
          if (user) {
            sellerName = user.name;
            res.json({ itemData, sellerName });
          } 
        })

        // Optionally, you can modify or process the data here before sending it
  
        // Send the item data in the response
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    });

  });

  router.post('/:itemId', async (req, res) => {
    try {
      const { userId, item } = req.body;
      const itemId = req.params.itemId;

      // Check if an item with status 'inCart'/'pending' already exists for the given itemId and buyerId
      const existingOrder = await Order.findOne({
        item_id : itemId,
        buyerId: userId,
      });
  
      if (item.sellerID === userId) {
        return res.status(200).json({ message: 'You cannot add your own item to cart.' });
      }
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
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
  
  module.exports = router;