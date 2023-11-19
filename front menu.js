import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import axios from 'axios';
import './Menu.css'; // Import the CSS file for styling

function Menu() {
  const history = useHistory(); // Initialize useHistory hook to manage navigation

  // State for menu items and cart items
  const [menuItems, setMenuItems] = useState([]); // State for menu items fetched from the backend
  const [cartItems, setCartItems] = useState([]); // State for items added to the cart
  const [showCheckout, setShowCheckout] = useState(false); // State to control showing the checkout details

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
    // Filter out items with quantity greater than 0 from menuItems
    const selectedItems = menuItems.filter((item) => item.quantity > 0);
    
    // Calculate total price based on selected items
    const totalPrice = selectedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
    
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

      // Show checkout details after successful submission
      setShowCheckout(true);
    })
    .catch((error) => {
      console.error('Error sending cart items:', error);
    });
  };

  return (
    <div>
      {showCheckout ? (
        // Display checkout details when showCheckout is true
        <div>
          <h2>Checkout</h2>
          {cartItems.map((item) => (
            <div key={item._id}>
              <p>{item.item}</p>
              <p>{item.description}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total Price: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          {/* Calculate total price for all items */}
          <p>Total Price for all items: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
        </div>
      ) : (
        // Display menu items and add to cart button
        <div className="menu-items-container">
          <h2>Menu</h2>
          <div className="menu-items-wrapper">
            {menuItems.map((menuItem) => (
              <div key={menuItem._id} className="menu-item">
                <p>{menuItem.item}</p>
                <p>{menuItem.description}</p>
                <p>${(menuItem.price).toFixed(2)}</p>
                <p>Quantity: {menuItem.quantity}</p>
                <div className="button-group">
                  <button onClick={() => increaseQuantity(menuItem)}>+</button>
                  <button onClick={() => decreaseQuantity(menuItem)}>-</button>
                </div>
              </div>
            ))}
          </div>
          <button className="bottom-left-button" onClick={addToCart}>
            Add Selected Items to Cart
          </button>
        </div>
      )}
    </div>
  );
  
}  

export default Menu;
