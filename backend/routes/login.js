
// login.js
const express = require("express");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const router = express.Router();


// import models
const User = require("../models/user");

// POST route to handle login
router.post("/", async (req, res) => {
   
    const { email, password } = req.body; // Get the email and password from the request body
    console.log(email)
    const user = await User.findOne({ email: email })
    
    if (!user) {
      res.status(201).json({ message: 'User not found or credentials are incorrect' });
      return;
    }
    
    console.log(user.password)
    
    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
      res.status(201);
      return;
    }
    else {
      res.status(200).json(user);
    }
    
});

module.exports = router;
