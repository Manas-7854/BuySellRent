import React, { useState } from 'react';
import Item from '../components/item'; // Assuming the Item component is available

const DeliveryPage = ({ deliveryItemsData }) => {
  // State to track items to deliver
  const [itemsToDeliver, setItemsToDeliver] = useState(deliveryItemsData);

  // State to track OTPs for each item (indexed by item ID)
  const [otpMap, setOtpMap] = useState({});

  // Handle OTP input change for each item
  const handleOtpChange = (itemId, value) => {
    setOtpMap((prevOtpMap) => ({
      ...prevOtpMap,
      [itemId]: value, // Update OTP for the specific item
    }));
  };

  // Handle OTP verification
  const handleOtpVerification = (itemId, enteredOtp) => {
    if (enteredOtp === '1234') {
      // Remove the item from the list when OTP is correct
      const updatedItems = itemsToDeliver.filter(item => item.id !== itemId);
      setItemsToDeliver(updatedItems); // Update the state with the filtered list
    } else {
      alert('Incorrect OTP');
    }
  };

  return (
    <div className="delivery-page">
      <h2>Items to Deliver</h2>

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
    </div>
  );
};

export default DeliveryPage;
