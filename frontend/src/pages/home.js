import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Components
import Navbar from '../components/navbar';

const token = localStorage.getItem("token");

const Home = () => {
	const { userId } = useParams(); // get the user ID from the URL

	// State Variables
	const navigate = useNavigate();
	const [userDetails, setUserDetails] = useState({});
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [editedDetails, setEditedDetails] = useState({});

	// Fetch user details based on user ID
	useEffect(() => {
		// If no token, redirect to login page
		if (!token) {
			navigate(`/login`);
		}
		const fetchUserDetails = async () => {

			try {
				const response = await axios.get(`http://localhost:4000/home/${userId}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = await response.data;

				if (response.status === 200) {
					setUserDetails(data); // Update state with fetched user data
					setEditedDetails(data); // Set initial edited details
					setLoading(false);
				}
			}
			catch (error) {
				console.log(error);
			}

		};

		fetchUserDetails();
	}, [userId]);

	// Handle change in input fields
	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditedDetails((prevDetails) => ({
			...prevDetails,
			[name]: value,
		}));
	};

	// Handle Edit Details
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(`http://localhost:4000/home/${userId}`, editedDetails);

			if (response.status === 200) {
				console.log("Details updated successfully");
				setUserDetails(editedDetails); // Save the changes
				setIsEditing(false); // Close the edit form
			} else {
				console.log("Details update failed");
			}
		} catch (error) {
			console.error("Error updating user details:", error);
		}
	};

	// Show loading indicator or error message if data is not yet loaded
	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<Navbar userId={userId} />
			<div style={styles.container} className='home-container'>
				<h1 className='home-heading'>Your Details</h1>

				{/* Display only available details */}
				{userDetails.name && <p className='user-info'>Name: {userDetails.name}</p>}
				{userDetails.lastName && <p className='user-info'>Last Name: {userDetails.lastName}</p>}
				{userDetails.email && <p className='user-info'>Email: {userDetails.email}</p>}
				{userDetails.age && <p className='user-info'>Age: {userDetails.age}</p>}
				{userDetails.contactNumber && <p className='user-info'>Contact Number: {userDetails.contactNumber}</p>}

				<button className='edit-button' onClick={() => setIsEditing(true)}>Edit Details</button>

				{isEditing && (
					<div>
						<h2 className='home-heading'>Edit Your Details</h2>
						<form className='edit-form' onSubmit={handleSubmit}>
							<div>
								<label className='form-label'>Name:</label>
								<input
									className='form-input'
									type="text"
									name="name"
									value={editedDetails.name || ""}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label className='form-label'>Last Name:</label>
								<input
									className='form-input'
									type="text"
									name="lastName"
									value={editedDetails.lastName || ""}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label className='form-label'>Email:</label>
								<input
									className='form-input'
									type="email"
									name="email"
									value={editedDetails.email || ""}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label className='form-label'>Age:</label>
								<input
									className='form-input'
									type="number"
									name="age"
									value={editedDetails.age || ""}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label className='form-label'>Contact Number:</label>
								<input
									className='form-input'
									type="number"
									name="contactNumber"
									value={editedDetails.contactNumber || ""}
									onChange={handleChange}
								/>
							</div>
							<button className='save-button' type="submit">Save Changes</button>
							<button className='cancel-button' type="button" onClick={() => setIsEditing(false)}>Cancel</button>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',  // Ensure full height
		justifyContent: 'flex-start',  // Keep content at the top
		alignItems: 'center',
		padding: '20px',
	},
};

export default Home;
