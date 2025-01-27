// Required Modules
const express = require('express');
const bcrypt = require('bcrypt');

// Router
const router = express.Router();

// import model
const Order = require('../models/order');
const Item = require('../models/item');

// Verify Otp
router.post('/:orderId', async (req, res) => {
	const orderId = req.params.orderId; // Get the orderId from the URL]
	const enteredOtp = req.body.enteredOtp; // Get the entered OTP from the request body

	if (!enteredOtp) {
		console.log("Please enter OTP");
		return res.status(201).json({ message: 'Please enter OTP' });
	}

	const order = await Order.findOne({ _id: orderId });

	if (order.otp === null) {
		console.log("Please generate otp ");
		return res.status(201).json({ message: 'Please generate otp' });
	}
	// Match the otp with order 

	const match = await bcrypt.compare(enteredOtp.toString(), order.otp);
	if (!match) {
		return res.status(201).json({ message: 'Incorrect OTP' });
	}

	// Update the order status to completed and remove item from the database
	Order.updateOne(
		{ _id: order._id },
		{ status: 'completed' },
	).then(async () => {
		const result = await Item.deleteOne({ _id: order.item_id }); // Delete the item from the Items Collection
		if (result.deletedCount === 0) {
			console.log("Item not found");
		} else {
			console.log("Item deleted successfully");
		}
		res.sendStatus(200);
	});
});

module.exports = router;