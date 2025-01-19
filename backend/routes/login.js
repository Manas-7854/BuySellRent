
// login.js
const express = require("express");
const router = express.Router();


// List of valid usernames and passwords
const validUsers = [
  { userId : '1', username: "mana", password: "mana" },
  { userId : '2', username: "john", password: "1234" },
  { userId : '3', username: "jane", password: "abcd" },
];

// POST route to handle login
router.post("/", (req, res) => {
  const { username, password } = req.body;
  console.log("username:", username);
  console.log("password:", password);
  
  // Check if the provided credentials exist in the validUsers array
  const userExists = validUsers.some(
    (user) => user.username === username && user.password === password
  );

  if (userExists) {
    console.log("login successful");
    res.status(200).json({ message: "Login successful!", userId: validUsers.find(user => user.username === username).userId });
  } else {
    console.log("login failed");
    res.status(401).json({ error: "Invalid username or password" });
  }
});

module.exports = router;
