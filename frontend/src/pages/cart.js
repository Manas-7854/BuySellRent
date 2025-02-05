// Required Modules
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Components
import CartItem from '../components/cartitem';
import Navbar from '../components/navbar';

// Get the token from local storage
const token = localStorage.getItem("token");

const MyCartPage = () => {
	const { userId } = useParams(); // Get the userId from the URL

	// State Variables
	const [cartItems, setCartItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		// If no token, redirect to login page
		if (!token) {
			navigate(`/login`);
		}

		// Fetch cart items from the backend
		const fetchCartItems = async () => {
			try {
				const response = await fetch(`http://localhost:4000/cart/${userId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
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

	// Calculate the total price of the cart
	const totalPrice = cartItems.reduce((acc, order) => acc + order.item_sellingPrice, 0);

	// Function to place an order
	const placeOrder = async () => {
		const response = await axios.post(`http://localhost:4000/orders/${userId}`, { cartItems });

		if (response.status === 200) {
			console.log("Order placed successfully");

			window.location.reload(); // refresh the page
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
			const response = await fetch(`http://localhost:4000/cart/${userId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
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
		<div>

			<Navbar userId={userId} />
		<div className="my-cart-page">
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
				</div>
	);
};

export default MyCartPage;
