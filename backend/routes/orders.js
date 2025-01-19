const express = require('express');
const router = express.Router();

// import models
const Order = require('../models/order');

router.get('/:userid', async (req, res) => {
  const userId = parseInt(req.params.userid);

    // Find orders where userId matches buyerId or sellerId, and status is pending or completed
  Order.find().then((orders) => { res.json(orders); });

});

module.exports = router;
