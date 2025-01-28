import React from "react";

const LandingPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to IIITH Buy-Sell Platform</h1>
            <p style={styles.subtitle}>Your one-stop destination for buying and selling within the IIITH community.</p>
            <div style={styles.buttonContainer}>
                <a href="/login" style={styles.button}>Login</a>
                <a href="/register" style={styles.button}>Register</a>
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: "#FFF6B3",
        color: "#333",
        fontFamily: "Arial, sans-serif",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
    },
    title: {
        fontSize: "2.5rem",
        marginBottom: "20px",
        color: "#7A3945", // Dark maroon
    },
    subtitle: {
        fontSize: "1.2rem",
        marginBottom: "30px",
        color: "#5A2F38", // Slightly lighter maroon
    },
    buttonContainer: {
        display: "flex",
        gap: "10px",
    },
    button: {
        backgroundColor: "#155E95",
        color: "white",
        textDecoration: "none",
        padding: "15px 30px",
        fontSize: "1rem",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },

};

export default LandingPage;
