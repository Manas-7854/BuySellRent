import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Pages & Components
import Navbar from '../components/navbar';

const Item = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const [item, setItem] = useState(null); // State to store the fetched item
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch item details from the backend
  useEffect(() => {
    const fetchItem = async () => {
      try {
        console.log(`http://localhost:4000/item/${id}`);
        const response = await fetch(`http://localhost:4000/item/${id}`);
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
  }, [id]);

  if (loading) {
    return (
      <div className="item-page">
        <Navbar />
        <p>Loading item details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="item-page">
        <Navbar />
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="item-page">
        <Navbar />
        <p>Item not found!</p>
      </div>
    );
  }

  return (
    <div className="item-page">
      <Navbar />
      <h2>Item Details</h2>
      <div className="item-details">
        <img src={item.image} alt={item.description} style={{ width: '300px', height: '300px' }} />
        <div>
          <h2>{item.description}</h2>
          <p>
            <strong>Category:</strong> {item.category}
          </p>
          <p>
            <strong>Original Price:</strong> ${item.originalPrice}
          </p>
          <p>
            <strong>Selling Price:</strong> ${item.sellingPrice}
          </p>
          <button onClick={() => alert('Item added to cart!')}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Item;
