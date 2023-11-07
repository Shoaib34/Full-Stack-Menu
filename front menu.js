import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Menu.css'; // Import the CSS file for styling

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemClick = (menuItem) => {
    const itemIndex = selectedItems.findIndex((item) => item._id === menuItem._id);

    if (itemIndex !== -1) {
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems[itemIndex] = {
        ...selectedItems[itemIndex],
        quantity: selectedItems[itemIndex].quantity + 1,
      };
      setSelectedItems(updatedSelectedItems);
    } else {
      setSelectedItems([...selectedItems, { ...menuItem, quantity: 1 }]);
    }
    console.log(`Added ${menuItem.item} to cart.`);
  };

  const increaseQuantity = (selectedItem) => {
    const updatedSelectedItems = selectedItems.map((item) =>
      item._id === selectedItem._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setSelectedItems(updatedSelectedItems);
  };

  const decreaseQuantity = (selectedItem) => {
    const updatedSelectedItems = selectedItems.map((item) =>
      item._id === selectedItem._id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
    );
    setSelectedItems(updatedSelectedItems);
  };

  const addToCart = () => {
    console.log('Selected Items:', selectedItems);
  };

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
      {selectedItems.length > 0 && (
        <button className="bottom-right-button" onClick={addToCart}>
          Add Selected Items to Cart
        </button>
      )}
    </div>
  );
}

export default Menu;
