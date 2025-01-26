import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/navbar";

function ChatPage() {
    const { userId } = useParams();
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "model", text: "Great to meet you. What would you like to know?" },
  ]);
  const [serverMessage, setServerMessage] = useState(""); // New state for server message

  // Fetch initial data from the server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/chat"); // Assuming your server has a reset endpoint
        setServerMessage(response.data.message); // Store server message
        console.log(response.data.message); // Log to console
      } catch (error) {
        console.error("Error fetching initial data", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleSendMessage = async () => {
    if (!userMessage) return;

    // Add user message to the conversation
    setMessages([...messages, { role: "user", text: userMessage }]);

    try {
      const response = await axios.post("http://localhost:4000/chat", {
        message: userMessage,
      });
      const modelMessage = response.data.response;

      // Add model's response to the conversation
      setMessages([...messages, { role: "user", text: userMessage }, { role: "model", text: modelMessage }]);
    } catch (error) {
      console.error("Error sending message", error);
    }
    
    setUserMessage(""); // Clear input field
  };

  return (
    <div>

        <Navbar userId={userId}/>
    <div className="chat-page">
      <div className="chat-container">
      <h3>{serverMessage && `Server says: ${serverMessage}`}</h3> {/* Display server message if available */}
      <div className="chat-box">
        {messages.map((msg, index) => (
            <div key={index} className={msg.role}>
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type a message"
          />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
    </div>
          </div>
  );
}

export default ChatPage;
