const express = require('express');
const router = express.Router();

// import models
const User = require('../models/user');

// import middleware
const authenticateToken = require('../middlewares/authMiddleware');

// Get item by ID
router.get('/:id', (req, res) => {
    const userId = req.params.id;

    User.findById(userId)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});



// Update item by ID
router.put('/:id', (req, res) => {
    console.log(req.body);
    const itemId = parseInt(req.params.id, 10);
    const itemIndex = users.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
        const updatedItem = { ...users[itemIndex], ...req.body }; // Update fields
        users[itemIndex] = updatedItem; // Replace old item with updated one
        res.json(updatedItem); // Return updated item
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

module.exports = router;
