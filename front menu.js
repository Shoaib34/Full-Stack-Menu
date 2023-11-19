import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Menu.css'; // Import the CSS file for styling

function Menu() {
  // State for menu items and cart items
  const [menuItems, setMenuItems] = useState([]); // State for menu items fetched from the backend
  const [cartItems, setCartItems] = useState([]); // State for items added to the cart

  // Function to increase quantity of a menu item
  const increaseQuantity = (menuItem) => {
    // Update quantity for the selected menu item in menuItems and cartItems
    const updatedMenuItems = menuItems.map((item) =>
      item._id === menuItem._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setMenuItems(updatedMenuItems);

    const updatedCartItems = cartItems.map((item) =>
      item._id === menuItem._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  // Function to decrease quantity of a menu item
  const decreaseQuantity = (menuItem) => {
    // Decrement quantity for the selected menu item in menuItems and cartItems
    const updatedMenuItems = menuItems.map((item) =>
      item._id === menuItem._id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
    );
    setMenuItems(updatedMenuItems);

    const updatedCartItems = cartItems.map((item) =>
      item._id === menuItem._id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
    );
    setCartItems(updatedCartItems);
  };

  // Fetch menu items from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3000/api/menu')
      .then((response) => {
        // Set the fetched menu items with initial quantity of 0
        setMenuItems(response.data.map((item) => ({ ...item, quantity: 0 })));
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error);
      });
  }, []);

  // Function to add selected items to the cart
const addToCart = () => {
  // Filter out items with quantity greater than 0 from cartItems
  const selectedItems = menuItems.filter((item) => item.quantity > 0);

  // Calculate total price based on selected items
  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Update cartItems state with selected items
  setCartItems(selectedItems);

    // Make a POST request to send selectedItems and totalPrice to the backend
    axios.post('http://localhost:3000/api/order', {
      items: selectedItems,
      totalPrice: totalPrice,
    })
    .then((response) => {
      console.log("Cart items sent to the server:", response.data);
      // Additional actions after successfully sending data
    })
    .catch((error) => {
      console.error('Error sending cart items:', error);
    });
  };

  // Rendering the menu items and buttons to increase/decrease quantity
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
              <button onClick={() => increaseQuantity(menuItem)}>+</button>
              <button onClick={() => decreaseQuantity(menuItem)}>-</button>
            </div>
          </div>
        ))}
      </div>
      {/* Button to add selected items to the cart */}
      <button className="bottom-right-button" onClick={addToCart}>
        Add Selected Items to Cart
      </button>
    </div>
  );
}

export default Menu;
