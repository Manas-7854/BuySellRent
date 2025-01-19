const express = require('express');
const router = express.Router();

const cartItems = [
  {
    id: 1,
    userId: 1, // User 1
    image: 'path_to_image1.jpg',
    description: 'Item 1 description...',
    originalPrice: 100,
    sellingPrice: 80,
    category: 'Electronics',
  },
  {
    id: 2,
    userId: 2, // User 2
    image: 'path_to_image2.jpg',
    description: 'Item 2 description...',
    originalPrice: 150,
    sellingPrice: 120,
    category: 'Clothing',
  },
  {
    id: 3,
    userId: 3, // User 3
    image: 'path_to_image3.jpg',
    description: 'Item 3 description...',
    originalPrice: 200,
    sellingPrice: 180,
    category: 'Electronics',
  },
  {
    id: 4,
    userId: 4, // User 4
    image: 'path_to_image4.jpg',
    description: 'Item 4 description...',
    originalPrice: 250,
    sellingPrice: 200,
    category: 'Clothing',
  },
  {
    id: 5,
    userId: 1, // User 1
    image: 'path_to_image5.jpg',
    description: 'Item 5 description...',
    originalPrice: 300,
    sellingPrice: 280,
    category: 'Electronics',
  },
  {
    id: 6,
    userId: 2, // User 2
    image: 'path_to_image6.jpg',
    description: 'Item 6 description...',
    originalPrice: 350,
    sellingPrice: 320,
    category: 'Clothing',
  },
  {
    id: 7,
    userId: 3, // User 3
    image: 'path_to_image7.jpg',
    description: 'Item 7 description...',
    originalPrice: 400,
    sellingPrice: 350,
    category: 'Electronics',
  },
  {
    id: 8,
    userId: 4, // User 4
    image: 'path_to_image8.jpg',
    description: 'Item 8 description...',
    originalPrice: 450,
    sellingPrice: 420,
    category: 'Electronics',
  },
  {
    id: 9,
    userId: 1, // User 1
    image: 'path_to_image9.jpg',
    description: 'Item 9 description...',
    originalPrice: 500,
    sellingPrice: 480,
    category: 'Clothing',
  },
  {
    id: 10,
    userId: 2, // User 2
    image: 'path_to_image10.jpg',
    description: 'Item 10 description...',
    originalPrice: 550,
    sellingPrice: 520,
    category: 'Electronics',
  },
  {
    id: 11,
    userId: 3, // User 3
    image: 'path_to_image11.jpg',
    description: 'Item 11 description...',
    originalPrice: 600,
    sellingPrice: 580,
    category: 'Clothing',
  },
  {
    id: 12,
    userId: 4, // User 4
    image: 'path_to_image12.jpg',
    description: 'Item 12 description...',
    originalPrice: 650,
    sellingPrice: 620,
    category: 'Electronics',
  },
  {
    id: 13,
    userId: 1, // User 1
    image: 'path_to_image13.jpg',
    description: 'Item 13 description...',
    originalPrice: 700,
    sellingPrice: 680,
    category: 'Clothing',
  },
  {
    id: 14,
    userId: 2, // User 2
    image: 'path_to_image14.jpg',
    description: 'Item 14 description...',
    originalPrice: 750,
    sellingPrice: 720,
    category: 'Electronics',
  },
  {
    id: 15,
    userId: 3, // User 3
    image: 'path_to_image15.jpg',
    description: 'Item 15 description...',
    originalPrice: 800,
    sellingPrice: 780,
    category: 'Clothing',
  },
  {
    id: 16,
    userId: 4, // User 4
    image: 'path_to_image16.jpg',
    description: 'Item 16 description...',
    originalPrice: 850,
    sellingPrice: 820,
    category: 'Electronics',
  }
];


// Get cart items by userId
router.get('/:userid', (req, res) => {
  const userId = parseInt(req.params.userid, 10); // Get the userId from the route parameter

  // Filter cart items for the specified userId
  const userCartItems = cartItems.filter(item => item.userId === userId);

  if (userCartItems.length > 0) {
    res.json(userCartItems); // Return the cart items for that user
  } else {
    res.status(404).json({ error: 'No items found for this user' });
  }
});

// Add item to cart
router.post('/:userID', (req, res) => {
  const { item } = req.body;
  itemId = item.id;
  console.log("item Id", item.id);
  const userId = parseInt(req.params.userID, 10);
  console.log("userID", userId);

  // Check if the item exists in the cartItems array
  const itemExists = cartItems.some(item => (item.id === itemId) && (item.userId === userId));
  console.log("itemExists", itemExists);
  if (itemExists) {
    res.status(200).json({ message: 'Item already exists in cart' });
  } 
  else {

    // add item to that users cart
    res.status(200).json({ message: 'Item added to cart'});
  
  }
});

// remove item from cart
// if single item deletion is not possible the clear the whole cart

module.exports = router;
