const express = require('express');
const router = express.Router();

// import model
const Item = require('../models/item');
  
router.get('/', (req, res) => {
    // res.json({ message: 'Items route' });
  Item.find().then(items => res.json(items));
  
});
  
module.exports = router;

 