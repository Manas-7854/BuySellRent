// Required Modules
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Router
const router = express.Router();

// Import models
const User = require('../models/user');

const saltRounds = 10;

// Secret key for JWT
const JWT_SECRET = "laddu";

// Add new User to the Database
router.post('/', async (req, res) => {
    const { username, lastName, email, age, contactNumber, password } = req.body; // Get user details from request body

    // Validate email domain
    if (!email.endsWith('iiit.ac.in')) {
        return res.status(400).json({ error: 'Invalid email domain. Please use an email ending in .iiit.ac.in' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password

        // Create a new User object
        const user = new User({
            name: username,
            lastName: lastName || '',  // Default empty string if not provided
            email: email,
            age: age || null,  // Default null if not provided
            contactNumber: contactNumber || null,  // Default null if not provided
            password: hashedPassword
        });

        const result = await user.save(); // Save the user

        // Generate JWT token
        const token = jwt.sign({ userId: result._id }, JWT_SECRET, { expiresIn: '10h' });

        res.status(200).json({ token, userId: result._id });
    } catch (err) {
        console.error(err.errmsg);
        res.status(500).json({ error: err.errmsg });
    }
});

module.exports = router;
