// orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Import the Order model

// Route to place an order
router.post('/', async (req, res) => {
  // Extract the data from the request body
  const { foodItemId, quantity } = req.body;

  try {
    // Create a new order based on the model and request data
    const newOrder = new Order({ foodItemId, quantity });
    
    // Save the order in the database
    await newOrder.save();

    // Respond with the new order and a success status
    res.status(201).json(newOrder);
  } catch (error) {
    // If an error occurs, respond with an error status and message
    res.status(500).json({ error: 'Failed to place order' });
  }
});

module.exports = router;
