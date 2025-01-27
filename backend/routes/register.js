// Required Modules
const experss = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Router
const router = experss.Router();

// import models
const User = require('../models/user');

const saltRounds = 10;

// Secret key for JWT
const JWT_SECRET = "laddu"; 

// Add new User to the Database
router.post('/', async (req, res) => {
    const { username, password, email } = req.body; // Get the username, password and email from the request body

    const hashedPassword = await bcrypt.hash(password, saltRounds); // hash the password

    // Create a new User object
    const user = new User({
        name: username,
        email: email,
        password: hashedPassword
    });

    user.save()
        .then((result) => {

            // Generate JWT token
            const token = jwt.sign({ userId: result._id }, JWT_SECRET, { expiresIn: '10h' });
            res.status(200).json({ token, userId: result._id });
        })
        .catch((err) => {
            console.log(err);
            res.status(201).send(err);
        });

});

module.exports = router;