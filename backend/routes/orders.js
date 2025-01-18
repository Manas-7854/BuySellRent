const express = require('express');
const router = express.Router();

const orderItems = [
  {
    userId: 1,
    id: 1,
    item: {
      id: 13,
      image: 'path_to_image13.jpg',
      description: 'Item 13 description...',
      originalPrice: 700,
      sellingPrice: 680,
      category: 'Clothing',
    },
    orderType: 'bought', // or 'sold' or 'pending'
    otp: null, // OTP is null for bought and sold orders
  },
  {
    userId: 2,
    id: 2,
    item: {
      id: 14,
      image: 'path_to_image14.jpg',
      description: 'Item 14 description...',
      originalPrice: 1200,
      sellingPrice: 1150,
      category: 'Electronics',
    },
    orderType: 'pending',
    otp: '123456', // OTP is present for pending orders
  },
  {
    userId: 3,
    id: 3,
    item: {
      id: 15,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    orderType: 'sold',
    otp: null,
  },
  {
    userId: 1,
    id: 4,
    item: {
      id: 5,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    orderType: 'pending',
    otp: '232345',
  },
  {
    userId: 2,
    id: 5,
    item: {
      id: 25,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    orderType: 'sold',
    otp: null,
  },
  {
    userId: 3,
    id: 6,
    item: {
      id: 1,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    orderType: 'bought',
    otp: null,
  },
  {
    userId: 2,
    id: 7,
    item: {
      id: 3,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    orderType: 'sold',
    otp: null,
  },
  {
    userId: 1,
    id: 8,
    item: {
      id: 2,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    orderType: 'bought',
    otp: null,
  },
  {
    userId: 3,
    id: 9,
    item: {
      id: 115,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    orderType: 'pending',
    otp: '898989',
  },
  {
    userId: 2,
    id: 10,
    item: {
      id: 2,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    orderType: 'bought',
    otp: null,
  },
  {
    userId: 1,
    id: 11,
    item: {
      id: 2,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    orderType: 'bought',
    otp: null,
  },
  {
    userId: 3,
    id: 12,
    item: {
      id: 2,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    orderType: 'bought',
    otp: null,
  },
  {
    userId: 2,
    id: 13,
    item: {
      id: 2,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    orderType: 'bought',
    otp: null,
  },
  {
    userId: 1,
    id: 14,
    item: {
      id: 2,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    orderType: 'bought',
    otp: null,
  },
  {
    userId: 3,
    id: 15,
    item: {
      id: 2,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    orderType: 'bought',
    otp: null,
  },
  {
    userId: 2,
    id: 16,
    item: {
      id: 2,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    orderType: 'bought',
    otp: null,
  },
  // More orders here...
];

// get order items by user id
router.get('/:userid', (req, res) => {
  const userId = parseInt(req.params.userid);
  const userOrders = orderItems.filter((order) => order.userId === userId);
  
  if (userOrders.length > 0) {
    res.json(userOrders)
    // res.status(200).json({ message: 'orders found for this user' });
    
  } else {
    res.status(404).json({ message: 'No orders found for this user' });
  }
});

module.exports = router;
