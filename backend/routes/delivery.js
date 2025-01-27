// Required libraries
const express = require('express');

// Router
const router = express.Router();

// import model
const Order = require('../models/order');
const Item = require('../models/item');

// import middleware
const authMiddleware = require("../middleware/auth");

// Get delivery items for a specific user
router.get('/:userId',authMiddleware,  (req, res) => {
  const userId = req.params.userId; // Get the userId from the url

  Order.find(
    { sellerId: userId, status: 'pending' },
  ).then((deliveries) => {
    res.json(deliveries);
  });
});

// Update the status of the order to 'completed' and delete the item
router.post('/:userId', (req, res) => {
  const userId = req.params.userId; // Get the userId from the url
  const order = req.body.item; // Get the order from the request body

  // update order status to completed
  Order.updateOne(
    { _id: order._id },
    { status: 'completed' },).then( async () =>{
      const result = await Item.deleteOne({ _id: order.item_id }); // Delete the item from the Items collection
    
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


