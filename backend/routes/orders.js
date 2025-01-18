const express = require('express');
const router = express.Router();

// orders items
const orderItems = [
    {
      id: 1,
      item: {
        id: 13,
        image: 'path_to_image13.jpg',
        description: 'Item 13 description...',
        originalPrice: 700,
        sellingPrice: 680,
        category: 'Clothing',
      },
      orderType: 'bought',  // or 'sold' or 'pending'
      otp: null, // OTP is null for bought and sold orders
    },
    {
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
    },  {
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
    },  {
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
    },  {
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
    },  {
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
    },   {
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
    },   {
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
    },   {
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
    },   {
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
    },   {
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

router.get('/', (req, res) => {
    res.json(orderItems); 
  });
  
module.exports = router;


