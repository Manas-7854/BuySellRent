const express = require("express");
const router = express.Router();
const Item = require("../models/item"); // Item Model

// Route to get items listed by the user
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const items = await Item.find({ sellerID: userId });
        
        console.log(userId);
        console.log(items);

        if (!items.length) {
            return res.status(404).json({ message: "No items found for this user." });
        }

        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching user's items:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
