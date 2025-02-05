// Required Libraries
const express = require('express');

// Router
const router = express.Router();

// Import models
const User = require('../models/user');

// Import middleware
const authMiddleware = require("../middleware/auth");

// Return User details
router.get('/:id', authMiddleware, async (req, res) => {
    const userId = req.params.id; // Get the userId from the url

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Update user details
router.post('/:id', async (req, res) => {
    const userId = req.params.id; // Get the userId from the url
    const updatedDetails = req.body; // Get user details from the request body

    // Validate email domain
    if (!updatedDetails.email.endsWith('iiit.ac.in')) {
        console.log("Invalid email detected")
        return res.status(400).json({ message : 'Invalid email domain. Please use an email ending in .iiit.ac.in' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updatedDetails, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
