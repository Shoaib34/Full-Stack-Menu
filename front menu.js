import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Menu.css'; // Import the CSS file for styling

function Menu() {
  // State to store menu items and cart items
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Function to handle adding an item to the cart
  const handleItemClick = (menuItem) => {
    // Clone the menu item and increase its quantity by 1
    const updatedMenuItems = menuItems.map((item) =>
      item._id === menuItem._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setMenuItems(updatedMenuItems);

    // Add the item to the cart
    setCartItems([...cartItems, { ...menuItem, quantity: menuItem.quantity + 1 }]);
    console.log(`Added ${menuItem.item} to cart.`);
  };

  // Function to increase the quantity of an item
  const increaseQuantity = (menuItem) => {
    const updatedMenuItems = menuItems.map((item) =>
      item._id === menuItem._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setMenuItems(updatedMenuItems);

    const updatedCartItems = cartItems.map((item) =>
      item._id === menuItem._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  // Function to decrease the quantity of an item
  const decreaseQuantity = (menuItem) => {
    const updatedMenuItems = menuItems.map((item) =>
      item._id === menuItem._id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
    );
    setMenuItems(updatedMenuItems);

    const updatedCartItems = cartItems.map((item) =>
      item._id === menuItem._id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
    );
    setCartItems(updatedCartItems);
  };

  // Fetch menu items from the backend API when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3000/api/menu') // Make an API request to get the menu items
      .then((response) => {
        // Store the retrieved menu items in state and initialize their quantity as 0
        setMenuItems(response.data.map((item) => ({ ...item, quantity: 0 })));
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error);
      });
  }, []);

  // Render the Menu component
  return (
    <div>
      <h2>Menu</h2>
      <div className="menu-items-container">
        {menuItems.map((menuItem) => (
          <div key={menuItem._id} className="menu-item">
            <p>{menuItem.item}</p>
            <p>{menuItem.description}</p>
            <p>${menuItem.price}</p>
            <p>Quantity: {menuItem.quantity}</p>
            <div className="button-group">
              <button onClick={() => handleItemClick(menuItem)}>Add to Cart</button>
              <button onClick={() => increaseQuantity(menuItem)}>+</button>
              <button onClick={() => decreaseQuantity(menuItem)}>-</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
