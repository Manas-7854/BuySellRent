import React, { useState } from 'react';

// pages and components
import Navbar from '../components/navbar';

const Home = () => {
  // Initial user details state
  const [userDetails, setUserDetails] = useState({
    name: 'Manas Agrawal',
    age: 20,
    branch: 'CND (Computer Science and New Technologies)',
    institution: 'IIIT Hyderabad',
    year: '2nd Year (Dual Degree)',
  });

  // State to control visibility of the edit form
  const [isEditing, setIsEditing] = useState(false);

  // State to temporarily store edited details
  const [editedDetails, setEditedDetails] = useState(userDetails);

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
