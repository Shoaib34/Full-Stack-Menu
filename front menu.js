import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Menu.css'; // Import the CSS file for styling

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const increaseQuantity = (menuItem) => {
    // Increment quantity for the selected menu item in both menuItems and cartItems
    const updatedMenuItems = menuItems.map((item) =>
      item._id === menuItem._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setMenuItems(updatedMenuItems);

    const updatedCartItems = cartItems.map((item) =>
      item._id === menuItem._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (menuItem) => {
    // Decrement quantity for the selected menu item in both menuItems and cartItems
    const updatedMenuItems = menuItems.map((item) =>
      item._id === menuItem._id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
    );
    setMenuItems(updatedMenuItems);

    const updatedCartItems = cartItems.map((item) =>
      item._id === menuItem._id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
    );
    setCartItems(updatedCartItems);
  };

  const addToCart = () => {
    console.log("Added items to cart:", cartItems);
    // Send a POST request to the backend with the cartItems
    axios.post('http://localhost:3000/api/order', { cartItems })
      .then((response) => {
        console.log("Cart items sent to the server:", response.data);
        // Perform additional actions after successfully sending data
      })
      .catch((error) => {
        console.error('Error sending cart items:', error);
      });
  };

  // Fetch menu items from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3000/api/menu')
      .then((response) => {
        setMenuItems(response.data.map((item) => ({ ...item, quantity: 0 })));
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error);
      });
  }, []);

  return (
    <div>
      <h2>Menu</h2>
      <div className="menu-items-container">
        {/* Display menu items with buttons to increase/decrease quantity */}
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
