// login.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken
const saltRounds = 10;

const router = express.Router();

// import models
const User = require("../models/user");

// Secret key for JWT
const JWT_SECRET = "laddu"; // Store this key securely in an environment variable

// POST route to handle login
router.post("/", async (req, res) => {
  const { email, password } = req.body; // Get the email and password from the request body

  
  const user = await User.findOne({ email: email });
  
  if (!user) {
    return res.status(400).json({ message: 'User not found or credentials are incorrect' });
  }

  const match = await bcrypt.compare(password, user.password);
  
  if (!match) {
    return res.status(400).json({ message: 'Incorrect password' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '10h' });

  // send the token and user ID in the response
  res.status(200).json({ token, userId: user._id });
});

module.exports = router;
