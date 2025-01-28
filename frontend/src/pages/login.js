// Required Modules
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", { email, password });
      
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); 
        
        const userId = response.data.userId;
        navigate(`/home/${userId}`);
      }
    } catch (error) {
      setMessage("Login failed: " + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="login-field">
          <label className="login-label">Email:</label>
          <input
            type="text"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-field">
          <label className="login-label">Password:</label>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <a href="/register" className="login-link">Don't have an account? Register here.</a>
      <p className="login-message">{message}</p>
    </div>
  );
};

export default Login;
