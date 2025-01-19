import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the dynamic user ID from the URL
import axios from 'axios';

// Import the Item component
import Item from '../components/item';
// Import the Navbar component
import Navbar from '../components/navbar';

const MyCartPage = () => {
  // get the user if from the url
  const { userId } = useParams();
  console.log("userid", userId);

  // State to manage cart items
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  // Fetch cart items from the backend on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:4000/cart/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCartItems(data); // Update cart items
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Function to remove an item from the cart
  const removeItem = async (itemId) => {
    // send request to remove item from cart 
  };

  // Calculate the total price of items in the cart
  const totalPrice = cartItems.reduce((acc, item) => acc + item.sellingPrice, 0);

  // Function to place an order
  const placeOrder = async () => {
    try {
      const response = await fetch('http://localhost:4000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItems),
      });
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
      const result = await response.json();
      console.log('Order placed successfully:', result);
      setCartItems([]); // Clear the cart after placing the order
    } catch (err) {
      console.error('Error placing order:', err.message);
    }
  };

  return (
    <div className="my-cart-page">
      <Navbar userId={userId}/>
      <div className="cart-content">
        <h2>My Cart</h2>
        {loading ? (
          <p>Loading your cart...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <Item item={item} userId={userId}/>
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
            {cartItems.length > 0 && (
              <div className="cart-summary">
                <h3>Total: ${totalPrice.toFixed(2)}</h3>
                <button className="place-order-button" onClick={placeOrder}>
                  Place Order
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyCartPage;