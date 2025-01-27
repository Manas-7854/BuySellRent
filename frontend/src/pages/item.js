// Required Modules
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Components
import Navbar from '../components/navbar';

// Token
const token = localStorage.getItem('token');

const Item = () => {
	const { itemId, userId } = useParams(); // Get the item ID from the URL

	// State Variables
	const [item, setItem] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	// Fetch item details from the backend
	useEffect(() => {
		if (!token) {
			navigate('/login');
		};
		const fetchItem = async () => {
			try {
				const response = await fetch(`http://localhost:4000/item/${itemId}`,
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
				setItem(data); // Update state with fetched item
			} catch (err) {
				setError(err.message); // Set error state
			} finally {
				setLoading(false); // Set loading to false
			}
		};

		fetchItem();
	}, [itemId]);

	// Add item to cart
	const addToCart = async (e) => {
		e.preventDefault();
		const response = await axios.post(`http://localhost:4000/item/${itemId}`, { userId, item: item.itemData });
		if (response.status === 200) {
			alert(`${response.data.message}`);
		};
	};

	if (loading) {
		return (
			<div className="item-page">
				<Navbar userId={userId} />
				<p>Loading item details...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="item-page">
				<Navbar userId={userId} />
				<p>Error: {error}</p>
			</div>
		);
	}

	if (!item) {
		return (
			<div className="item-page">
				<Navbar userId={userId} />
				<p>Item not found!</p>
			</div>
		);
	}

	return (
		<div>
			<Navbar userId={userId} />

		<div className="item-page">
			<h2>Item Details</h2>
			<div className="item-details">

				<div>
					<h2>{item.itemData.description}</h2>
					<p>
						<strong>Category:</strong> {item.itemData.category}
					</p>
					<p>
						<strong>Original Price:</strong> ${item.itemData.originalPrice}
					</p>
					<p>
						<strong>Selling Price:</strong> ${item.itemData.sellingPrice}
					</p>
					<p>
						<strong>Seller Name:</strong> {item.sellerName}
					</p>
					<button onClick={addToCart}>Add to Cart</button>
				</div>
			</div>
		</div>
		</div>
	);
};

export default Item;
