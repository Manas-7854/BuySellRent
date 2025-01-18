const express = require('express');
const router = express.Router();

// delivery items
const deliveryItems =[
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
    },  {
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
      id: 44,
      item: {
        id: 14,
        image: 'path_to_image14.jpg',
        description: 'Item 14 description...',
        originalPrice: 1200,
        sellingPrice: 1150,
        category: 'Electronics',
      },
    },  {
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

router.get('/', (req, res) => {
    res.json(deliveryItems); 
  });
  
module.exports = router;


