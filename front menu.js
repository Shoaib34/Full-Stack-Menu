import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Menu() {
  // State to store menu items
  const [menuItems, setMenuItems] = useState([]);

  // Function to handle adding an item to the cart
  const handleItemClick = (menuItem) => {
    // You can implement the logic here to add the item to a shopping cart or perform any other action when the button is clicked.
    console.log(`Added ${menuItem.item} to cart.`);
  };

  // Fetch menu items from the backend API when the component mounts
  useEffect(() => {
    console.log('Fetching menu items...'); // Log a message when the component mounts
    axios.get('http://localhost:3000/api/menu')
      .then((response) => {
        console.log('Menu items:', response.data); // Log the data received from the backend
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error); // Log any errors
      });
  }, []);

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {/* Map through the 'menuItems' array and create a list item for each item */}
        {menuItems.map((menuItem) => (
  <li key={menuItem._id}>
    {/* Display menu item information */}
    {menuItem.item} - {menuItem.description} - ${menuItem.price}
    {/* Button to add the menu item to the cart */}
    <button onClick={() => handleItemClick(menuItem)}>Add to Cart</button>
  </li>
))}
      </ul>
    </div>
  );
}

export default Menu;
