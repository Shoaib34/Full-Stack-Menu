import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Menu() {
  // Define a state variable to hold menu items
  const [menuItems, setMenuItems] = useState([]);

  // Fetch menu items from the back end when the component mounts
  useEffect(() => {
    // Make a GET request to your back-end API to fetch menu items
    axios.get('/api/server')
      .then((response) => {
        // Set the 'menuItems' state with the data received from the back end
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error);
      });
  }, []);

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {/* Map through the 'menuItems' array and create a list item for each item */}
        {menuItems.map((menuItem) => (
          <li key={menuItem._id}>
            {menuItem.item} - {menuItem.description} - ${menuItem.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
