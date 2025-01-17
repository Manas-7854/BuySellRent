import React from 'react';
import { useParams } from 'react-router-dom';

// PAGES & COMPONENTS
import Navbar from '../components/navbar';

const Item = ({ itemsData }) => {
  const { id } = useParams();
  const item = itemsData.find((item) => item.id === parseInt(id));

  if (!item) {
    return <p>Item not found!</p>;
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
