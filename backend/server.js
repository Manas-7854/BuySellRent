
// Import the required packages
const express = require('express');
const mongoose = require('mongoose');

// Create an express app
const app = express();
const cors = require('cors');

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

