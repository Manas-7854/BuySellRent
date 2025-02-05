// Component to log user out of the application

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    window.location.href = "http://localhost:4000/logout";

    // Redirect to the login page
    navigate("/login");
  };

  logoutUser();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Logging Out...</h1>
    </div>
  );
};

export default Logout;
