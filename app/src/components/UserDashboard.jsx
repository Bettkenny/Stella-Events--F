import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserDashboard = ({ user }) => {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        if (user) {
          const response = await fetch(
            `https://stella-events-b.onrender.com/user/${user.id}/events`
          );

          if (response.ok) {
            const data = await response.json();
            setRegisteredEvents(data);
          } else {
            console.error(
              "Error fetching registered events:",
              response.statusText
            );
          }
        }
      } catch (error) {
        console.error("Error fetching registered events:", error);
      }
    };

    fetchRegisteredEvents();
  }, [user]);

  const handleCancelRegistration = async (eventId) => {
    try {
      const response = await fetch(
        `https://stella-events-b.onrender.com/${user.id}/events/${eventId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setRegisteredEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventId)
        );
        console.log("Registration canceled successfully.");
      } else {
        console.error("Error canceling registration:", response.statusText);
      }
    } catch (error) {
      console.error("Error canceling registration:", error);
    }
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      {user ? (
        <>
          <p>Welcome, {user.username}!</p>
          <h3>Registered Events</h3>
          {registeredEvents.length > 0 ? (
            registeredEvents.map((event) => (
              <div key={event.id}>
                <p>{event.title}</p>
                <button onClick={() => handleCancelRegistration(event.id)}>
                  Cancel Registration
                </button>
              </div>
            ))
          ) : (
            <p>No registered events.</p>
          )}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
      <Link to="/tickets">View Your Tickets</Link>
    </div>
  );
};

export default UserDashboard;
