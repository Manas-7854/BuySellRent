const express = require('express');
const router = express.Router();

const cartItems = [
    {
      id: 1,
      image: 'path_to_image1.jpg',
      description: 'Item 1 description...',
      originalPrice: 100,
      sellingPrice: 80,
      category: 'Electronics',
    },
    {
      id: 2,
      image: 'path_to_image2.jpg',
      description: 'Item 2 description...',
      originalPrice: 150,
      sellingPrice: 120,
      category: 'Clothing',
    },
    {
      id: 3,
      image: 'path_to_image3.jpg',
      description: 'Item 3 description...',
      originalPrice: 200,
      sellingPrice: 180,
      category: 'Electronics',
    },
    {
      id: 4,
      image: 'path_to_image4.jpg',
      description: 'Item 4 description...',
      originalPrice: 250,
      sellingPrice: 200,
      category: 'Clothing',
    },
    {
      id: 5,
      image: 'path_to_image5.jpg',
      description: 'Item 5 description...',
      originalPrice: 300,
      sellingPrice: 280,
      category: 'Electronics',
    },
    {
      id: 6,
      image: 'path_to_image6.jpg',
      description: 'Item 6 description...',
      originalPrice: 350,
      sellingPrice: 320,
      category: 'Clothing',
    },
    {
      id: 7,
      image: 'path_to_image7.jpg',
      description: 'Item 7 description...',
      originalPrice: 400,
      sellingPrice: 350,
      category: 'Electronics',
    },
    {
      id: 8,
      image: 'path_to_image8.jpg',
      description: 'Item 8 description...',
      originalPrice: 450,
      sellingPrice: 420,
      category: 'Electronics',
    },
    {
      id: 9,
      image: 'path_to_image9.jpg',
      description: 'Item 9 description...',
      originalPrice: 500,
      sellingPrice: 480,
      category: 'Clothing',
    },
    {
      id: 10,
      image: 'path_to_image10.jpg',
      description: 'Item 10 description...',
      originalPrice: 550,
      sellingPrice: 520,
      category: 'Electronics',
    },
    {
      id: 11,
      image: 'path_to_image11.jpg',
      description: 'Item 11 description...',
      originalPrice: 600,
      sellingPrice: 580,
      category: 'Clothing',
    },
    {
      id: 12,
      image: 'path_to_image12.jpg',
      description: 'Item 12 description...',
      originalPrice: 650,
      sellingPrice: 620,
      category: 'Electronics',
    },
    {
      id: 13,
      image: 'path_to_image13.jpg',
      description: 'Item 13 description...',
      originalPrice: 700,
      sellingPrice: 680,
      category: 'Clothing',
    },
    {
      id: 14,
      image: 'path_to_image14.jpg',
      description: 'Item 14 description...',
      originalPrice: 750,
      sellingPrice: 720,
      category: 'Electronics',
    },
    {
      id: 15,
      image: 'path_to_image15.jpg',
      description: 'Item 15 description...',
      originalPrice: 800,
      sellingPrice: 780,
      category: 'Clothing',
    },
    {
      id: 16,
      image: 'path_to_image16.jpg',
      description: 'Item 16 description...',
      originalPrice: 850,
      sellingPrice: 820,
      category: 'Electronics',
    }
  ];
  
  
router.get('/', (req, res) => {
    res.json(cartItems); 
  });
  
module.exports = router;

