// src/components/AddItem.js
import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
// import useEffect
import { useEffect } from "react";


// import components
import Navbar from "../components/navbar";

const AddItem = () => {

  const { userId } = useParams();

  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (!["electronics", "medicine", "food"].includes(category.toLowerCase())) {
      setMessage("Invalid category! Please select electronics, medicine, or food.");
      return;
    }

    console.log("userId:", userId);
    console.log("description:", description);
    console.log("originalPrice:", originalPrice);
    console.log("sellingPrice:", sellingPrice);
    console.log("category:", category);

    const newItem = {
      description,
      originalPrice: parseFloat(originalPrice),
      sellingPrice: parseFloat(sellingPrice),
      category,
    };

    try {
      const response = await axios.post(`http://localhost:4000/add-item/${userId}`, {description, originalPrice, sellingPrice, category});

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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Navbar userId={userId}/>
      <h1>Add Item</h1>
      <form onSubmit={handleAddItem}>
        <div>
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Original Price: </label>
          <input
            type="number"
            step="0.01"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Selling Price: </label>
          <input
            type="number"
            step="0.01"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category: </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="medicine">Medicine</option>
            <option value="food">Food</option>
          </select>
        </div>
        <button type="submit">Add Item</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddItem;
