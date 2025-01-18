const express = require('express');
const router = express.Router();

// Sample data
const users = [
    {
        id: 1,
        name: 'Manas',
        age: 20,
        branch: 'CND (Computer Science and New Technologies)',
        institution: 'IIIT Hyderabad',
        year: '2nd Year (Dual Degree)',
    },
    {
        id: 2,
        name: 'John Doe',
        age: 25,
        branch: 'Computer Science',
        institution: 'MIT',
        year: 'Final Year',
    },
    {
        id: 3,
        name: 'Jane Doe',
        age: 23,
        branch: 'Electrical Engineering',
        institution: 'Stanford',
        year: '3rd Year',
    },
    {
        id: 4,
        name: 'Alice',
        age: 22,
        branch: 'Mechanical Engineering',
        institution: 'IIT Bombay',
        year: '4th Year',
    },
    {
        id: 5,
        name: 'Bob',
        age: 21,
        branch: 'Civil Engineering',
        institution: 'IIT Delhi',
        year: '3rd Year',
    },
    {
        id: 6,
        name: 'Charlie',
        age: 24,
        branch: 'Chemical Engineering',
        institution: 'IIT Kharagpur',
        year: '4th Year',
    }
    // Add more users as needed
];
 
// Get item by ID
router.get('/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const item = users.find((item) => item.id === itemId);

    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// Update item by ID
router.put('/:id', (req, res) => {
    console.log(req.body);
    const itemId = parseInt(req.params.id, 10);
    const itemIndex = users.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
        const updatedItem = { ...users[itemIndex], ...req.body }; // Update fields
        users[itemIndex] = updatedItem; // Replace old item with updated one
        res.json(updatedItem); // Return updated item
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

module.exports = router;
