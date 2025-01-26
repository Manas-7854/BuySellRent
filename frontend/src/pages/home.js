import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the dynamic user ID from the URL
import { useNavigate } from 'react-router-dom';

import axios from 'axios'; // Import axios for making HTTP requests
// pages and components
import Navbar from '../components/navbar';

const token = localStorage.getItem("token");

const Home = () => {
  // Get the user ID from the URL
  const { userId } = useParams();
  const navigate = useNavigate();
  // console.log("userid", userId);

  // Initial user details state
  const [userDetails, setUserDetails] = useState({
    name: '',
    age: '',
    branch: '',
    institution: '',
    year: '',
  });

  // Loading state to show a loading spinner or message while data is being fetched
  const [loading, setLoading] = useState(true);

  // State to control visibility of the edit form
  const [isEditing, setIsEditing] = useState(false);

  // State to temporarily store edited details
  const [editedDetails, setEditedDetails] = useState(userDetails);

  // Fetch user details based on user ID
  useEffect(() => {
    if (!token) {
      // If no token, redirect to login page
      navigate(`/login`);
    }
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/home/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setUserDetails(data); // Update state with fetched user data
          setEditedDetails(data); // Set initial edited details
          setLoading(false); // Set loading to false once data is loaded
        } else {
          console.error('Error fetching user data:', data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]); // The effect runs whenever the user ID in the URL changes

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission (save changes)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Log the new name and email
    console.log("New Name:", editedDetails.name);
    console.log("New Email:", editedDetails.email);

    const response = axios.post(`http://localhost:4000/home/${userId}`, { name:editedDetails.name, email:editedDetails.email },

    );
  
    if (response.status === 200) {
      console.log("Details updated successfully");
    }
    else {
      console.log("Details update failed");
    }
  
    // Save the changes
    setUserDetails(editedDetails); // Save the changes
    setIsEditing(false); // Close the edit form
  };
  

  // Show loading indicator or error message if data is not yet loaded
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar userId={userId}/>
      <h1>Your Details</h1>
      <p>Name: {userDetails.name}</p>
      <p>email: {userDetails.email}</p>
      
      <button onClick={() => setIsEditing(true)}>Edit Details</button>

      {isEditing && (
        <div>
          <h2>Edit Your Details</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editedDetails.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={editedDetails.email}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
