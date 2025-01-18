const express = require('express');
const router = express.Router();

const deliveryItems = [
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
  },
  {
    userId: 3,
    id: 3,
    item: {
      id: 13,
      image: 'path_to_image13.jpg',
      description: 'Item 13 description...',
      originalPrice: 700,
      sellingPrice: 680,
      category: 'Clothing',
    },
  },
  {
    userId: 1,
    id: 44,
    item: {
      id: 14,
      image: 'path_to_image14.jpg',
      description: 'Item 14 description...',
      originalPrice: 1200,
      sellingPrice: 1150,
      category: 'Electronics',
    },
  },
  {
    userId: 2,
    id: 53,
    item: {
      id: 13,
      image: 'path_to_image13.jpg',
      description: 'Item 13 description...',
      originalPrice: 700,
      sellingPrice: 680,
      category: 'Clothing',
    },
  },
  {
    userId: 3,
    id: 62,
    item: {
      id: 14,
      image: 'path_to_image14.jpg',
      description: 'Item 14 description...',
      originalPrice: 1200,
      sellingPrice: 1150,
      category: 'Electronics',
    },
  },
  {
    userId: 1,
    id: 11,
    item: {
      id: 13,
      image: 'path_to_image13.jpg',
      description: 'Item 13 description...',
      originalPrice: 700,
      sellingPrice: 680,
      category: 'Clothing',
    },
  },
  {
    userId: 2,
    id: 21,
    item: {
      id: 14,
      image: 'path_to_image14.jpg',
      description: 'Item 14 description...',
      originalPrice: 1200,
      sellingPrice: 1150,
      category: 'Electronics',
    },
  },
];

// Get delivery items for a specific user
router.get('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);

  const userDeliveries = deliveryItems.filter((item) => item.userId === userId);

  if (userDeliveries.length > 0) {
    res.json(userDeliveries);
  }
  else {
    res.status(404).json({ message: 'No delivery items found for the user' });
  }

});

module.exports = router;


