import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/navbar';
import CartItem from '../components/cartitem';

const token = localStorage.getItem("token");

const OrdersPage = () => {
    const { userId } = useParams();
    const [ordersData, setOrdersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('buy');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate(`/login`);
        }

        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:4000/orders/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setOrdersData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const boughtOrders = ordersData.filter(order => order.status === 'completed' && order.buyerId === userId);
    const soldOrders = ordersData.filter(order => order.status === 'completed' && order.sellerId === userId);
    const pendingOrders = ordersData.filter(order => order.status === 'pending' && order.buyerId === userId);

    const generateOtp = async (orderId) => {
        const response = await axios.get(`http://localhost:4000/generateOtp/${orderId}`);
        alert(`OTP generated: ${response.data.otp}`);
    };

    return (
        <div>
            <Navbar userId={userId} />
            <div className="orders-page">
                <h2>Your Orders</h2>

                <div className="tabs">
                    <button onClick={() => setActiveTab('buy')} className={`tab-button ${activeTab === 'buy' ? 'active' : ''}`}>Buy Orders</button>
                    <button onClick={() => setActiveTab('sell')} className={`tab-button ${activeTab === 'sell' ? 'active' : ''}`}>Sell Orders</button>
                    <button onClick={() => setActiveTab('pending')} className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}>Pending Orders</button>
                </div>

                {loading && <p>Loading orders...</p>}
                {error && <p>Error: {error}</p>}

                {!loading && !error && (
                    <div className="orders-section">
                        {activeTab === 'buy' && (
                            <div>
                                <h3>Bought Orders</h3>
                                {boughtOrders.length > 0 ? boughtOrders.map(order => (
                                    <div key={order._id} className="order-item bought-order">
                                        <CartItem order={order} userId={userId} />
                                    </div>
                                )) : <p>No bought orders</p>}
                            </div>
                        )}

                        {activeTab === 'sell' && (
                            <div>
                                <h3>Sold Orders</h3>
                                {soldOrders.length > 0 ? soldOrders.map(order => (
                                    <div key={order._id} className="order-item sold-order">
                                        <CartItem order={order} userId={userId} />
                                    </div>
                                )) : <p>No sold orders</p>}
                            </div>
                        )}

                        {activeTab === 'pending' && (
                            <div>
                                <h3>Pending Orders</h3>
                                {pendingOrders.length > 0 ? pendingOrders.map(order => (
                                    <div key={order._id} className="order-item pending-order">
                                        <CartItem order={order} userId={userId} />
                                        <button onClick={() => generateOtp(order._id)} className="otp-button">Generate OTP</button>
                                    </div>
                                )) : <p>No pending orders</p>}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;

// CSS Styles
const styles = `
    .tabs {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }
    .tab-button {
        padding: 10px 20px;
        margin: 0 5px;
        border: none;
        background-color: #6A80B9;
        color: white;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s ease-in-out;
    }
    .tab-button:hover {
        background-color: #155E95;
    }
    .tab-button.active {
        background-color: #F6C794;
        color: black;
    }
    .otp-button {
        padding: 8px 15px;
        background-color: #F6C794;
        border: none;
        color: black;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s ease-in-out;
    }
    .otp-button:hover {
        background-color: #FFF6B3;
    }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
