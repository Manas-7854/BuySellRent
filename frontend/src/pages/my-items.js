import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Item from "../components/item"; // Importing Item component
import Navbar from "../components/navbar"; // Import Navbar

const token = localStorage.getItem("token"); // Retrieve authentication token

const MyItemsPage = () => {
    const { userId } = useParams(); // Get userId from URL
    const navigate = useNavigate();
    const [itemsData, setItemsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) {
            navigate(`/login`); // Redirect to login if no token is found
        }

        const fetchMyItems = async () => {
            try {
                const response = await fetch(`http://localhost:4000/my-items/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setItemsData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMyItems();
    }, [userId]);

    return (
        <div>
            <Navbar userId={userId} />
            <div className="my-items-page">
                <h2>My Items for Sale</h2>
                {loading ? (
                    <p>Loading items...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : itemsData.length > 0 ? (
                    <div className="items-list">
                        {itemsData.map((item) => (
                            <Item key={item._id} item={item} userId={userId} />
                        ))}
                    </div>
                ) : (
                    <p>No items listed for sale.</p>
                )}
            </div>
        </div>
    );
};

export default MyItemsPage;
