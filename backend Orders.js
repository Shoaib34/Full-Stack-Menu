// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an Express application
const app = express();

// Define the port the server will listen on
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/food', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Create a basic model and schema for the "food" collection in MongoDB
const menuSchema = new mongoose.Schema({
  item: String,
  description: String,
  price: Number,
  quantity: Number,
});

const Menu = mongoose.model('order', menuSchema);

// Enable CORS (Cross-Origin Resource Sharing) to allow requests from other domains
app.use(cors());

// Parse JSON data in incoming requests
app.use(express.json());

// Define your API routes (e.g., an endpoint to get a list of menu items)
app.get('/api/order', async (req, res) => {
  try {
    // Fetch all menu items from the MongoDB database using Mongoose
    const menuItems = await Menu.find({});
    res.json(menuItems);
    console.log('Menu items fetched from the database:', menuItems);
    // Respond with the menu items as a JSON array
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
