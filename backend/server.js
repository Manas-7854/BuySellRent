
const express = require('express');

const cors = require('cors');
const app = express();
const PORT = 4000;

// import routes 
const itemsRoutes = require('./routes/items');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');
const deliveryRoutes = require('./routes/delivery');
const itemRoutes = require('./routes/item');
const homeRoutes = require('./routes/home');


// Use CORS to allow cross-origin requests
app.use(cors());

app.use(express.urlencoded({ extended: true }));

// Use the routes

app.use('/items', itemsRoutes);

app.use('/cart', cartRoutes);

app.use('/orders', ordersRoutes);

app.use('/delivery', deliveryRoutes);

app.use('/item', itemRoutes);

app.use('/home', homeRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
