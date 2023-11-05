import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Menu.css';

function Menu() {
  const [menuItems, setMenuItems] = useState([]); // State to store menu items
  const [cartItems, setCartItems] = useState([]); // State to store cart items

  // Function to handle adding an item to the cart
  const handleItemClick = (menuItem) => {
    const existingCartItem = cartItems.find((item) => item._id === menuItem._id);

    if (existingCartItem) {
      // If the item is already in the cart, increase its quantity by 1
      const updatedCart = cartItems.map((item) =>
        item._id === menuItem._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      // If it's a new item, add it to the cart with a quantity of 1
      setCartItems([...cartItems, { ...menuItem, quantity: 1 }]);
    }

    console.log(`Added ${menuItem.item} to cart.`);
  };

  // Function to increase the quantity of an item in the cart
  const increaseQuantity = (menuItem) => {
    const updatedCart = cartItems.map((item) =>
      item._id === menuItem._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  // Function to decrease the quantity of an item in the cart
  const decreaseQuantity = (menuItem) => {
    const updatedCart = cartItems.map((item) =>
      item._id === menuItem._id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
    );
    setCartItems(updatedCart);
  };

  // Fetch menu items from the backend API when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3000/api/menu') // Fetch menu items from the API
      .then((response) => {
        // Store the retrieved menu items in state
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error);
      });
  }, []);

  return (
    <div>
      <h2>Menu</h2>
      <div className="menu-items-container">
        {menuItems.map((menuItem) => (
          <div key={menuItem._id} className="menu-item">
            <p>{menuItem.item}</p>
            <p>{menuItem.description}</p>
            <p>${menuItem.price}</p>
            <p>Quantity: {menuItem.quantity}</p> {/* Display the quantity of the item */}
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
