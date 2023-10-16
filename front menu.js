import React from 'react';

function Menu() {
  // Define an array of menu items
  const menuItems = [
    {
      id: 1,
      name: 'Burger',
      description: 'A delicious burger with all the fixings.',
      price: 10.99,
    },
    {
      id: 2,
      name: 'Pizza',
      description: 'A classic pizza with your favorite toppings.',
      price: 12.99,
    },
    {
      id: 3,
      name: 'Pasta',
      description: 'Spaghetti with marinara sauce and meatballs.',
      price: 9.99,
    },
    // You can add more menu items here
    {
      id: 4,
      name: 'Salad',
      description: 'Fresh garden salad with choice of dressing.',
      price: 7.99,
    },
    {
      id: 5,
      name: 'Steak',
      description: 'Juicy steak cooked to perfection.',
      price: 15.99,
    },
  ];

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
