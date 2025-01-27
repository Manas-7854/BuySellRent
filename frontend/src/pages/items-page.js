// Required Modules
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Import components
import Item from '../components/item';
import Navbar from '../components/navbar';

// Get the token from local storage
const token = localStorage.getItem("token");

const ItemsPage = () => {
	const { userId } = useParams(); // Get the user ID from the URL
	const navigate = useNavigate(); // Get the navigate function from the router

	// State Variables
	const [itemsData, setItemsData] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(5000);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch items from the backend
	useEffect(() => {
		// If no token, redirect to login page
		if (!token) {
			navigate(`/login`);
		}

		// Fetch items from the backend
		const fetchItems = async () => {
			try {
				const response = await fetch(`http://localhost:4000/items/${userId}`,
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
				setItemsData(data); // Update state with fetched items
			} catch (err) {
				setError(err.message); // Handle fetch error
			} finally {
				setLoading(false); // Set loading to false
			}
		};

		fetchItems();
	}, []);

	// Filter items based on search query, selected category, and price range
	const filteredItems = itemsData.filter((item) => {
		const matchesSearch = item.description.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
		const matchesPrice = item.sellingPrice >= minPrice && item.sellingPrice <= maxPrice;

		return matchesSearch && matchesCategory && matchesPrice;
	});

	return (
		<div>

		
		<Navbar userId={userId} />
		<div className="items-page">
			<div className="content">
				<div className="filters">
					<h2>Filters</h2>
					<div>
						<label>Category:</label>
						<select
							onChange={(e) => setSelectedCategory(e.target.value)}
							value={selectedCategory}
						>
							<option value="">All</option>
							<option value="electronics">Electronics</option>
							<option value="clothing">Clothing</option>
							<option value="medicine">Medicine</option>
							<option value="food">Food</option>
							<option value="books">Books</option>
							<option value="kitchen">Kitchen</option>
							<option value="miscellaneous">Miscellaneous</option>
							{/* Add more categories here */}
						</select>
					</div>

					<div>
						<label>Price Range:</label>
						<input
							type="number"
							placeholder="Min Price"
							value={minPrice}
							onChange={(e) => setMinPrice(Number(e.target.value))}
						/>
						<input
							type="number"
							placeholder="Max Price"
							value={maxPrice}
							onChange={(e) => setMaxPrice(Number(e.target.value))}
						/>
					</div>
				</div>

				<div className="items-list">
					<div className="search-bar">
						<input
							type="text"
							placeholder="Search items..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					<div className="items">
						{loading ? (
							<p>Loading items...</p>
						) : error ? (
							<p>Error: {error}</p>
						) : filteredItems.length > 0 ? (
							filteredItems.map((item) => <Item key={item._id} item={item} userId={userId} />)
						) : (
							<p>No items found</p>
						)}
					</div>
				</div>
			</div>
		</div>
		</div>
	);
};

export default ItemsPage;
