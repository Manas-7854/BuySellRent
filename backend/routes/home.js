// Required Libraries
const express = require('express');

// Router
const router = express.Router();

// import models
const User = require('../models/user');

// import middleware
const authMiddleware = require("../middleware/auth");

// Return User detaisl
router.get('/:id', authMiddleware, (req, res) => {
    const userId = req.params.id; // Get the userId from the url

    // Find the user by userId
    User.findById(userId)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

//update user details
router.post('/:id', (req, res) => {
    const userId = req.params.id; // get the userId from the url
    const { name, email } = req.body; // get the user details from the request body

    // update the user details
    User.findByIdAndUpdate(userId, { name, email }).then((result) => {
        res.status(200).json(result);
    });
});

module.exports = router;
