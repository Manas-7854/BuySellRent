// Router for adding new item to the database

const express = require('express');
const router = express.Router();

// import models
const Item = require('../models/item');

router.post('/:userid',  (req, res) => {
    userId = req.params.userid;  // get userId from the url

    const { description, originalPrice, sellingPrice, category } = req.body; // parse the request

    // create new item and add to the database
    const item = new Item({
        sellerID: userId,
        description: description,
        originalPrice: originalPrice,
        sellingPrice: sellingPrice,
        category: category,
    }); 

    item.save()
        .then((result) => {
            console.log("Item added successfully:", result);
            res.send(result);
        })
        .catch((err) => {
            console.log("Error adding item:", err);
            res.status(400).send(err);
        });
});

module.exports = router;