// Required Modules
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // State Variables
  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    // Send user details to the server
    try {
      const response = await axios.post("http://localhost:4000/register", {
        username,
        lastName,
        email,
        age: age ? parseInt(age) : null, // Ensure age is sent as a number
        contactNumber: contactNumber ? parseInt(contactNumber) : null, // Ensure contactNumber is sent as a number
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Store token locally
        console.log(response.data.token);
        console.log(response.data.userId);
        navigate(`/home/${response.data.userId}`);
      }
    } catch (error) {
      setMessage("Registration failed: " + (error.response?.data?.error || "Unknown error"));
    }
  };

  const handleCASLogin = () => {
    window.location.href = "http://localhost:4000/cas";
  };

  return (
    <div className="register-container">
      <h1 className="register-heading">Register</h1>
      <form onSubmit={handleRegister} className="register-form">
        <div className="register-field">
          <label className="register-label">First Name:</label>
          <input
            type="text"
            className="register-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="register-field">
          <label className="register-label">Last Name:</label>
          <input
            type="text"
            className="register-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="register-field">
          <label className="register-label">Email:</label>
          <input
            type="email"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="register-field">
          <label className="register-label">Age:</label>
          <input
            type="number"
            className="register-input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="register-field">
          <label className="register-label">Contact Number:</label>
          <input
            type="number"
            className="register-input"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>
        <div className="register-field">
          <label className="register-label">Password:</label>
          <input
            type="password"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="register-field">
          <label className="register-label">Confirm Password:</label>
          <input
            type="password"
            className="register-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
      <a href="/login" className="register-link">Already have an account? Login</a>
      <button onClick={handleCASLogin} className="register-button">Login with CAS</button>
      <p className="register-message">{message}</p>
    </div>
  );
};

export default Register;
