import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the dynamic user ID from the URL
import Item from '../components/item'; // Assuming you have the Item component
import Navbar from '../components/navbar'; // Navbar Component

const OrdersPage = () => {
  const { userId } = useParams(); // Get the userId from the URL
  console.log("user", userId); 
  console.log(typeof userId);


  const [ordersData, setOrdersData] = useState([]); // State to store fetched orders
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:4000/orders/${userId}`); // Fetch from backend
        console.log("response", response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrdersData(data); // Update state with fetched orders
      } catch (err) {
        setError(err.message); // Handle fetch error
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchOrders();
  }, []);

  // Filter orders into categories
  const boughtOrders = ordersData.filter((order) => order.status === 'completed' || order.buyerId === parseInt(userId));
  const soldOrders = ordersData.filter((order) => order.status === 'completed' && order.sellerId === parseInt(userId));
  const pendingOrders = ordersData.filter((order) => order.status === 'pending' && order.buyerId === parseInt(userId));

  return (
    <div className="orders-page">
      <Navbar userId={userId}/>
      <h2>Your Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <div className="orders-section">
            <h3>Bought Orders</h3>
            <div className="orders-list">
              {boughtOrders.length > 0 ? (
                boughtOrders.map((order) => (
                  <div key={order.id} className="order-item bought-order">
                    <Item item={order.item} />
                  </div>
                ))
              ) : (
                <p>No bought orders</p>
              )}
            </div>
          </div>

          <div className="orders-section">
            <h3>Sold Orders</h3>
            <div className="orders-list">
              {soldOrders.length > 0 ? (
                soldOrders.map((order) => (
                  <div key={order.id} className="order-item sold-order">
                    <Item item={order.item} />
                  </div>
                ))
              ) : (
                <p>No sold orders</p>
              )}
            </div>
          </div>

          <div className="orders-section">
            <h3>Pending Orders</h3>
            <div className="orders-list">
              {pendingOrders.length > 0 ? (
                pendingOrders.map((order) => (
                  <div key={order.id} className="order-item pending-order">
                    <Item item={order.item} />
                    <div className="otp">
                      <p>OTP: {order.otp}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No pending orders</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersPage;
