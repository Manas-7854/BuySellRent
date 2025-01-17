import React from 'react';
import Item from '../components/item'; // Assuming you have the Item component

// Pages & Components
import Navbar from '../components/navbar';

const OrdersPage = ({ ordersData }) => {
  const boughtOrders = ordersData.filter(order => order.orderType === 'bought');
  const soldOrders = ordersData.filter(order => order.orderType === 'sold');
  const pendingOrders = ordersData.filter(order => order.orderType === 'pending');

  return (
    <div className="orders-page">
        <Navbar />
      <h2>Your Orders</h2>

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
    </div>
  );
};

export default OrdersPage;
