import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the dynamic user ID from the URL
import axios from 'axios';

// Pages and components
import Navbar from '../components/navbar';
import CartItem from '../components/cartitem'; // Assuming the Item component is available

const DeliveryPage = () => {
  const { userId } = useParams(); // Get the user ID from the URL

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
        const response = await fetch(`http://localhost:4000/delivery/${userId}`);
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
  const handleOtpVerification = async (orderId, enteredOtp) => {
    console.log("itemId", orderId);
    console.log("enteredOtp", enteredOtp);

    const response = await axios.post(`http://localhost:4000/verifyOtp/${orderId}`, { enteredOtp });

    if (response.status === 200) {
      // OTP verification successful
      alert("Transaction completed successfully!");
    }
    else {
      alert("Incorrect OTP");
    }

    // const item = itemsToDeliver.find((item) => item.item_id === orderId);

    // if (parseInt(enteredOtp) === item.otp) {
    //   console.log("the otp is correct");
    //   // send a post request with the order
    //   console.log(item);
    //   const response = await axios.post(`http://localhost:4000/delivery/${userId}`, { item });

    //   if (response.status === 200) {
    //     // Transaction completed successfully
    //     console.log('Transaction completed successfully!');
    //   }

    // }
  };

  return (
    <div className="delivery-page">
      <Navbar userId={userId}/>
      <h2>Items to Deliver</h2>

      {loading ? (
        <p>Loading items to deliver...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="delivery-list">
          {itemsToDeliver.length > 0 ? (
            itemsToDeliver.map((item) => (
              <div key={item.item_id} className="delivery-item">
                <CartItem order={item} userId={userId} />

                <div className="otp-verification">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otpMap[item.item_id] || ''}
                    onChange={(e) => handleOtpChange(item.item_id, e.target.value)}
                  />
                  <button onClick={() => handleOtpVerification(item._id, otpMap[item.item_id])}>
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
