// Required Modules
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Components
import Navbar from '../components/navbar';
import CartItem from '../components/cartitem';

// Token
const token = localStorage.getItem("token");

const OrdersPage = () => {
	const { userId } = useParams(); // Get the userId from the URL

	// State Variables
	const [ordersData, setOrdersData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	// Fetch orders from the backend
	useEffect(() => {
		// If no token, redirect to login page
		if (!token) {
			navigate(`/login`);
		}

		// Fetch orders
		const fetchOrders = async () => {
			try {
				const response = await fetch(`http://localhost:4000/orders/${userId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

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
	const boughtOrders = ordersData.filter((order) => order.status === 'completed' && order.buyerId === userId);
	const soldOrders = ordersData.filter((order) => order.status === 'completed' && order.sellerId === userId);
	const pendingOrders = ordersData.filter((order) => order.status === 'pending' && order.buyerId === userId);

	// Generate OTP for the order
	const generateOtp = async (orderId) => {
		const response = await axios.get(`http://localhost:4000/generateOtp/${orderId}`);
		alert(`OTP generated: ${response.data.otp}`); // Display the generated OTP
	};

	return (
		<div>

			<Navbar userId={userId} />
		<div className="orders-page">
			<h2>Your Orders</h2>


			<div className="orders-section">
				<h3>Bought Orders</h3>
				<div className="orders-list">
					{boughtOrders.length > 0 ? (
						boughtOrders.map((order) => (
							<div key={order._id} className="order-item bought-order">
								<CartItem order={order} userId={userId} />
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
							<div key={order._id} className="order-item sold-order">
								<CartItem order={order} userId={userId} />
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
							<div key={order._id} className="order-item pending-order">
								<CartItem order={order} userId={userId} />
								<div className="otp">
									<button onClick={() => generateOtp(order._id)}>
										generateOtp
									</button>
								</div>
							</div>
						))
					) : (
						<p>No pending orders</p>
					)}
				</div>
			</div>


		</div>
					</div>
	);
};

export default OrdersPage;
