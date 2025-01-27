// Required Libraries
const express = require('express');

// Router
const router = express.Router();

// import model
const Item = require('../models/item');

// import middleware
const authMiddleware = require("../middleware/auth");
  
// Get all the items in the database
router.get('/:userid', authMiddleware, (req, res) => {
    // res.json({ message: 'Items route' });
  Item.find().then(items => res.json(items));
  
});
  
module.exports = router;

 