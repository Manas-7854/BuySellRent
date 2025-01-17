import { useState } from 'react';

// Import the Item component
import Item from '../components/item';
// Import the Navbar component
import Navbar from '../components/navbar';


const MyCartPage = ({ initialCartItems }) => {
  // State to manage cart items
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Function to remove an item from the cart
  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
};

// Calculate the total price of items in the cart
const totalPrice = cartItems.reduce((acc, item) => acc + item.sellingPrice, 0);

  return (
    <div className="my-cart-page">
      <Navbar />
      <div className="cart-content">
        <h2>My Cart</h2>
        <div className="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <Item item={item} />
                {/* Remove Button */}
                <button className="remove-item-button" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>

        {/* Display the total price and Place Order button */}
        <div className="cart-summary">
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button className="place-order-button">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default MyCartPage;
