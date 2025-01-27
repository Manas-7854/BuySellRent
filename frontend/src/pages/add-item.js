import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/navbar";

const AddItem = () => {
  const { userId } = useParams(); // Get the user ID from the URL

  // State variables
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if no token is found
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();

    // Validate category
    if (!["electronics", "medicine", "food", "clothing", "books", "kitchen", "miscellaneous"].includes(category.toLowerCase())) {
      setMessage("Invalid category! Please select a valid category.");
      return;
    }

    // Add item to the database
    try {
      const response = await axios.post(`http://localhost:4000/add-item/${userId}`, { description, originalPrice, sellingPrice, category });

      // Check if the item was added successfully, clear the form and redirect to home page
      if (response.status === 200) {
        setMessage("Item added successfully!");
        setDescription("");
        setOriginalPrice("");
        setSellingPrice("");
        setCategory("");
        navigate(`/home/${userId}`);
      } else {
        setMessage("Failed to add item.");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      setMessage("Error occurred while adding item.");
    }
  };

  return (
    <div className="add-item-container">

        <Navbar userId={userId} />
      <div style={styles.container}>
        <h1 className="add-item-heading">Add Item</h1>
        <form className="add-item-form" onSubmit={handleAddItem}>
          <div className="form-field">
            <label className="form-label">Description: </label>
            <input className="form-input" 
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label">Original Price: </label>
            <input className="form-input"
              type="number"
              step="0.01"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label">Selling Price: </label>
            <input className="form-input"
              type="number"
              step="0.01"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label" >Category: </label>
            <select className="form-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="medicine">Medicine</option>
              <option value="food">Food</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="kitchen">Kitchen</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
          </div>
          <button className="submit-button" type="submit">Add Item</button>
        </form>
        <p>{message}</p>
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

export default AddItem;
