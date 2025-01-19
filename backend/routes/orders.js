const express = require('express');
const router = express.Router();

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
    buyerId: 1,
    sellerId: 2,
    status: 'completed',
    otp: null,
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
    buyerId: 2,
    sellerId: 1,
    status: 'pending',
    otp: '123456',
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
    buyerId: 3,
    sellerId: 1,
    status: 'completed',
    otp: null,
  },
  {
    id: 4,
    item: {
      id: 5,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    buyerId: 1,
    sellerId: 2,
    status: 'pending',
    otp: '232345',
  },
  {
    id: 5,
    item: {
      id: 25,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    buyerId: 2,
    sellerId: 3,
    status: 'completed',
    otp: null,
  },
  {
    id: 6,
    item: {
      id: 1,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    buyerId: 3,
    sellerId: 1,
    status: 'completed',
    otp: null,
  },
  {
    id: 7,
    item: {
      id: 3,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    buyerId: 1,
    sellerId: 2,
    status: 'completed',
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
    buyerId: 2,
    sellerId: 1,
    status: 'completed',
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
    buyerId: 3,
    sellerId: 2,
    status: 'pending',
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
    buyerId: 1,
    sellerId: 2,
    status: 'completed',
    otp: null,
  },
  {
    id: 11,
    item: {
      id: 2,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    buyerId: 1,
    sellerId: 3,
    status: 'completed',
    otp: null,
  },
  {
    id: 12,
    item: {
      id: 2,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    buyerId: 3,
    sellerId: 2,
    status: 'completed',
    otp: null,
  },
  {
    id: 13,
    item: {
      id: 2,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    buyerId: 2,
    sellerId: 3,
    status: 'completed',
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
    buyerId: 1,
    sellerId: 2,
    status: 'completed',
    otp: null,
  },
  {
    id: 15,
    item: {
      id: 2,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    buyerId: 3,
    sellerId: 2,
    status: 'completed',
    otp: null,
  },
  {
    id: 16,
    item: {
      id: 2,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 850,
      sellingPrice: 800,
      category: 'Clothing',
    },
    buyerId: 1,
    sellerId: 3,
    status: 'completed',
    otp: null,
  },
  // More orders here...
];


router.get('/:userid', (req, res) => {
  const userId = parseInt(req.params.userid);
  const userOrders = orderItems.filter((order) => order.buyerId === userId || order.sellerId === userId);
  
  if (userOrders.length > 0) {
    res.json(userOrders)
    // res.status(200).json({ message: 'orders found for this user' });
    
  } else {
    res.status(404).json({ message: 'No orders found for this user' });
  }
});

module.exports = router;
