import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Menu() {
  // Define a state variable to hold menu items
  const [menuItems, setMenuItems] = useState([]);

  // Fetch menu items from the back end when the component mounts
  useEffect(() => {
    // Make a GET request to your back-end API to fetch menu items
    axios.get('/api/menu') // Replace with your actual API endpoint
      .then((response) => {
        // Set the 'menuItems' state with the data received from the back end
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error);
      });
  }, []);

  // Function to handle placing an order for a menu item
  const handleOrder = (menuItem) => {
    // Make a POST request to your back-end API to place an order
    axios.post('/api/order', { item: menuItem.item })
      .then((response) => {
        // Handle the response (e.g., show a confirmation message)
        console.log('Order placed successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error placing the order:', error);
      });
  };

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {/* Map through the 'menuItems' array and create a button for each item */}
        {menuItems.map((menuItem) => (
          <button key={menuItem._id} onClick={() => handleOrder(menuItem)}>
            {menuItem.item}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
