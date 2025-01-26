const express = require('express');
const router = express.Router();

// import model
const Order = require('../models/order');
const Item = require('../models/item');

// Get delivery items for a specific user
router.get('/:userId', (req, res) => {
  // get the user id from url
  const userId = req.params.userId;
  console.log("userId: ", userId);
  console.log(typeof(userId));

  // fetch orders from database of the user
  Order.find(
    { sellerId: userId, status: 'pending' },
  ).then((deliveries) => {
    res.json(deliveries);
  });
});

router.post('/:userId', (req, res) => {
  // get the user id from url
  const userId = req.params.userId;

  // get the item from request body
  const order = req.body.item;

  console.log("order", order);

  // update the status of the order to 'completed'
  Order.updateOne(
    { _id: order._id },
    { status: 'completed' },
  ).then( async () =>{
 
      // Assuming order.item_id contains the item_id you want to delete
      const itemId = order.item_id;
      
      // Delete the item from the Item model using item_id
      const result = await Item.deleteOne({ _id: itemId });
    
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


