// Required Modules
const express = require('express');

// Router
const router = express.Router();
// import Models
const Notification = require('../models/notification');

// import Middleware

// Get all the Notifications in the Database
router.get('/:userid', async (req, res) => {
    const userId = req.params.userid;

    try {
        const notifications = await Notification.find({ userId });
        res.json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// add new notifications
router.post('/:userid', async (req, res) => {
    const userId = req.params.userid;
    const { description } = req.body;

    try {
        const newNotification = new Notification({
            userId,
            description,
        });

        await newNotification.save();

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;