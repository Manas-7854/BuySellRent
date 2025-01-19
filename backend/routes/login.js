
// login.js
const express = require("express");
const router = express.Router();

// import models
const User = require("../models/user");

// POST route to handle login
router.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log("username:", email);
  console.log("password:", password);
  
  User.findOne({ email: email, password: password })
  .then((user) => {
      if (user) {
          res.json(user); // Send the user data as JSON
      } else {
          res.status(404).json({ message: 'User not found or credentials are incorrect' }); // Handle not found case
      }
  })
  .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching the user' }); // Handle server error
  });


});

module.exports = router;
