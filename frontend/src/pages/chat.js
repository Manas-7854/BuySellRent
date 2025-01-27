// Required Modules
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import Navbar from "../components/navbar";

// Token
const token = localStorage.getItem("token");

function ChatPage() {
	const { userId } = useParams(); // Get the user ID from the URL

	// State Variables
	const [userMessage, setUserMessage] = useState("");
	const [messages, setMessages] = useState([
		{ role: "model", text: "Great to meet you. What would you like to know?" },
	]);
	const [serverMessage, setServerMessage] = useState("");
	const navigate = useNavigate();

	// Fetch initial data from the server when the component mounts
	useEffect(() => {
		// If no token, redirect to login page
		if (!token) {
			navigate(`/login`);
		}

		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:4000/chat");
				setServerMessage(response.data.message); // Store server message
			} catch (error) {
				console.error("Error fetching initial data", error);
			}
		};
		fetchData();
	}, []);

	// Function to handle sending a message
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

			<Navbar userId={userId} />
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
