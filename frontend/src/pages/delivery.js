import React, { useState, useEffect } from 'react';

// Pages and components
import Navbar from '../components/navbar';
import Item from '../components/item'; // Assuming the Item component is available

const DeliveryPage = () => {
  // State to track items to deliver
  const [itemsToDeliver, setItemsToDeliver] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // State to track OTPs for each item (indexed by item ID)
  const [otpMap, setOtpMap] = useState({});

  // Fetch delivery items from the backend
  useEffect(() => {
    const fetchDeliveryItems = async () => {
      try {
        const response = await fetch('http://localhost:4000/delivery');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setItemsToDeliver(data); // Update state with fetched delivery items
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryItems();
  }, []);

  // Handle OTP input change for each item
  const handleOtpChange = (itemId, value) => {
    setOtpMap((prevOtpMap) => ({
      ...prevOtpMap,
      [itemId]: value, // Update OTP for the specific item
    }));
  };

  // Handle OTP verification
  const handleOtpVerification = async (itemId, enteredOtp) => {
    try {
      const response = await fetch(`http://localhost:4000/delivery/${itemId}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: enteredOtp }),
      });

      if (!response.ok) {
        throw new Error('OTP verification failed');
      }

      const result = await response.json();
      if (result.success) {
        // Remove the item from the list when OTP is correct
        const updatedItems = itemsToDeliver.filter((item) => item.id !== itemId);
        setItemsToDeliver(updatedItems);
        alert('Transaction completed successfully!');
      } else {
        alert('Incorrect OTP');
      }
    } catch (err) {
      console.error('Error verifying OTP:', err.message);
      alert('Error verifying OTP');
    }
  };

  return (
    <div className="delivery-page">
      <Navbar />
      <h2>Items to Deliver</h2>

      {loading ? (
        <p>Loading items to deliver...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="delivery-list">
          {itemsToDeliver.length > 0 ? (
            itemsToDeliver.map((item) => (
              <div key={item.id} className="delivery-item">
                <Item item={item.item} />

                <div className="otp-verification">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otpMap[item.id] || ''}
                    onChange={(e) => handleOtpChange(item.id, e.target.value)}
                  />
                  <button onClick={() => handleOtpVerification(item.id, otpMap[item.id])}>
                    Complete Transaction
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No items to deliver</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryPage;
