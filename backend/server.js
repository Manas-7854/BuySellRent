
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


// Use CORS to allow cross-origin requests
app.use(cors());

// Use the routes

app.use('/items', itemsRoutes);

app.use('/cart', cartRoutes);

app.use('/orders', ordersRoutes);

app.use('/delivery', deliveryRoutes);

app.use('/item', itemRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
