import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/navbar";

const NotificationsPage = () => {
    const { userId } = useParams()
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/notification/${userId}`)
            .then((res) => res.json())
            .then((data) => setNotifications(data))
            .catch((error) => console.error("Error fetching notifications:", error));
    }, [userId]);

    return (
        <div>

            <Navbar userId={userId} />

            <div className="notifications-page">
                <h2>Notifications</h2>
                <div className="notifications-list">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <div key={notification._id} className="notification-item">
                                <p>{notification.description}</p>
                                <span className="timestamp">
                                    {new Date(notification.createdAt).toLocaleString()}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="no-notifications">No new notifications</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;

// CSS Styles
const styles = `
.notifications-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #FFF6B3; /* Pale Yellow */
  font-family: Arial, sans-serif;
}

.notifications-page h2 {
  color: #155E95; /* Deep Blue */
  font-size: 2rem;
  margin-bottom: 20px;
}

.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 600px;
}

.notification-item {
  background-color: #F6C794; /* Peach */
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.notification-item p {
  color: #155E95; /* Deep Blue */
  font-size: 1.1rem;
}

.timestamp {
  margin-top: 5px;
  font-size: 0.9rem;
  color: #6A80B9; /* Light Blue */
}

.no-notifications {
  color: #6A80B9; /* Light Blue */
  font-size: 1.2rem;
  text-align: center;
}
`;

const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
