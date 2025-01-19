const express = require('express');
const router = express.Router();

// import models
const Item = require('../models/item');

router.post('/:userid', (req, res) => {
    // get item details from the request
    userId = req.params.userid;
    console.log("userId:", userId);

    const { description, originalPrice, sellingPrice, category } = req.body;
    console.log("description:", description);
    console.log("originalPrice:", originalPrice);
    console.log("sellingPrice:", sellingPrice);
    console.log("category:", category);

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