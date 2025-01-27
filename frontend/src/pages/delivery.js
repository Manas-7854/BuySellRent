// Required Modules
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Pages and components
import Navbar from '../components/navbar';
import CartItem from '../components/cartitem';

// Token
const token = localStorage.getItem('token');

const DeliveryPage = () => {
	const { userId } = useParams(); // Get the user ID from the URL

	// State Variables
	const [itemsToDeliver, setItemsToDeliver] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const [otpMap, setOtpMap] = useState({});

	// Fetch delivery items from the backend
	useEffect(() => {
		// Redirect to login if token is not present
		if (!token) {
			navigate('/login');
		}

		// Fetch delivery items from the backend for the userId
		const fetchDeliveryItems = async () => {
			try {
				const response = await fetch(`http://localhost:4000/delivery/${userId}`,
					{
						headers: {
							authorization: `Bearer ${token}`,
						},
					}
				);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setItemsToDeliver(data); // Update state with fetched delivery items
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchDeliveryItems();
	}, []);

	// Handle OTP input change for each item
	const handleOtpChange = (itemId, value) => {
		setOtpMap((prevOtpMap) => ({
			...prevOtpMap,
			[itemId]: value, // Update OTP for the specific item
		}));
	};

	// Handle OTP verification
	const handleOtpVerification = async (orderId, enteredOtp) => {
		const response = await axios.post(`http://localhost:4000/verifyOtp/${orderId}`, { enteredOtp });

		if (response.status === 200) {
			// OTP verification successful
			alert("Transaction completed successfully!");
		}
		else {
			alert("Incorrect OTP");
		}
	};

	return (
		<div>

				<Navbar userId={userId} />
			<div className="delivery-page">
				<h2>Items to Deliver</h2>

				{loading ? (
					<p>Loading items to deliver...</p>
				) : error ? (
					<p>Error: {error}</p>
				) : (
					<div className="delivery-list">
						{itemsToDeliver.length > 0 ? (
							itemsToDeliver.map((item) => (
								<div key={item.item_id} className="delivery-item">
									<CartItem order={item} userId={userId} />

									<div className="otp-verification">
										<input
											type="text"
											placeholder="Enter OTP"
											value={otpMap[item.item_id] || ''}
											onChange={(e) => handleOtpChange(item.item_id, e.target.value)}
										/>
										<button onClick={() => handleOtpVerification(item._id, otpMap[item.item_id])}>
											Complete Transaction
										</button>
									</div>
								</div>
							))
						) : (
							<p>No items to deliver</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default DeliveryPage;
