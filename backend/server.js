// Require Modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an express app
const app = express();

// set the port
const PORT = 4000;

// database connection string
const dburi = 'mongodb+srv://manasagrawal889:dT91hRhgJMev19mG@bsr.jmxks.mongodb.net/?retryWrites=true&w=majority&appName=BSR';
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => { // Start the server
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  }).catch((err) => { console.log(err) });


// import routes 
const loginRoutes = require('./routes/login');
const itemsRoutes = require('./routes/items');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');
const deliveryRoutes = require('./routes/delivery');
const itemRoutes = require('./routes/item');
const homeRoutes = require('./routes/home');
const registerRoutes = require('./routes/register');
const additemRoutes = require('./routes/add-item');
const supportRoutes = require('./routes/support');
const verifyOtpRoutes = require('./routes/verifyOtp');
const generateOtpRoutes = require('./routes/generateOtp');
const notificationRoutes = require('./routes/notification');

// Use CORS to allow cross-origin requests
app.use(cors());
app.use(express.json());

// Use the routes
app.use("/login", loginRoutes)
app.use('/register', registerRoutes);
app.use('/items', itemsRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes);
app.use('/delivery', deliveryRoutes);
app.use('/item', itemRoutes);
app.use('/home', homeRoutes);
app.use("/add-item", additemRoutes);
app.use('/chat', supportRoutes);
app.use('/verifyOtp', verifyOtpRoutes);
app.use('/generateOtp', generateOtpRoutes);
app.use('/notification', notificationRoutes);


// Handle CAS Login

// Required Modules
let CASAuthentication = require('cas-authentication');
let session = require("express-session");
const jwt = require("jsonwebtoken");

// import models
const User = require("./models/user");

// CAS Authentication
const cas = new CASAuthentication({
    cas_url: 'https://login.iiit.ac.in/cas',
    service_url: 'http://localhost:4000', // backend url
});

// Middleware
app.use(session({
  secret:'laddu',
  resave: false,
  saveUninitialized: true}
));

const JWT_SECRET = "laddu";

// CAS login route
app.get("/cas", cas.bounce, async (req, res) => {
  const userEmail = req.session.cas_user; // get the user Email

  // check if the user already exists
  let user = await User.findOne({ email: userEmail });

  // if the user doesn't already exists, create a new user
  if (!user) {
    const newUser = new User({
      name: userEmail,
      email: userEmail,
      password: "laddu",
    });

    await newUser.save(); 
  }

  user = await User.findOne({ email: userEmail });


  console.log(user);

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '10h' });

  // redirect to login page with id and token in the url
  res.redirect(`http://localhost:3000/login/${user._id}/${token}`);
});

app.get("/logout", cas.logout, (req, res) => {
  res.redirect(`http://localhost:3000/login`);
})