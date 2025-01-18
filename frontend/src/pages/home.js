import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the dynamic user ID from the URL

// pages and components
import Navbar from '../components/navbar';

const Home = () => {
  // Get the user ID from the URL
  const { userId } = useParams();
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
    const fetchUserDetails = async () => {
      try {
        console.log("flag 1")
        const response = await fetch(`http://localhost:4000/home/${userId}`);
        console.log("flag 2")
        const data = await response.json();
        console.log("flag 3")

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
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserDetails(editedDetails); // Save the changes
    setIsEditing(false); // Close the edit form
  };

  // Show loading indicator or error message if data is not yet loaded
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <h1>Your Details</h1>
      <p>Name: {userDetails.name}</p>
      <p>Age: {userDetails.age}</p>
      <p>Branch: {userDetails.branch}</p>
      <p>Institution: {userDetails.institution}</p>
      <p>Year: {userDetails.year}</p>
      
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
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={editedDetails.age}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Branch:</label>
              <input
                type="text"
                name="branch"
                value={editedDetails.branch}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Institution:</label>
              <input
                type="text"
                name="institution"
                value={editedDetails.institution}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Year:</label>
              <input
                type="text"
                name="year"
                value={editedDetails.year}
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
