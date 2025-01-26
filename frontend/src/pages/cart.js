import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

import CartItem from '../components/cartitem';
import Navbar from '../components/navbar';

const MyCartPage = () => {
  const { userId } = useParams();
  console.log("userid", userId);

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:4000/cart/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCartItems(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  const totalPrice = cartItems.reduce((acc, order) => acc + order.item_sellingPrice, 0);

  const placeOrder = async () => {
    console.log(cartItems);

    const response = await axios.post(`http://localhost:4000/orders/${userId}`, { cartItems });

    if (response.status === 200) {
      console.log("Order placed successfully");
      // refresh the page
      window.location.reload();
    } else {
      console.log("Order failed");
    }
  };

  // Function to remove an item from the cart
  const removeItem = async (orderId) => {
    console.log("orderId", orderId);

    const response = await axios.post(`http://localhost:4000/cart/${userId}/`, { orderId });

    if (response.status === 200) {
      console.log("Item removed successfully");
      // Refetch the cart items
      const response = await fetch(`http://localhost:4000/cart/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCartItems(data);
    } else {
      console.log("Item removal failed");
    }
  };

  return (
    <div className="my-cart-page">
      <Navbar userId={userId} />
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
                cartItems.map((order) => (
                  <div key={order.item_id} className="cart-item">
                    <CartItem order={order} userId={userId} />
                    {/* Add the Remove button here */}
                    <button 
                      className="remove-item-button" 
                      onClick={() => removeItem(order._id)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p>Your cart is empty</p>
              )}
            </div>

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
