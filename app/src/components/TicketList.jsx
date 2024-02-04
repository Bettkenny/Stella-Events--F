import React, { useState, useEffect } from "react";

const TicketList = ({ user }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          "https://stella-events-b.onrender.com/tickets"
        );
        console.log("Response Status:", response.status);
        if (!response.ok) {
          throw new Error("Error fetching tickets");
        }

        const data = await response.json();
        setTickets(data);
        console.log("Tickets fetched successfully:", data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchTickets();
  }, []);

  const handleBuyTicket = async (event) => {
    const availableTickets = event.tickets_available;
  
    if (availableTickets > 0) {
      try {
        // Update the UI first
        const updatedTickets = tickets.map((ticket) =>
          ticket.id === event.id
            ? { ...ticket, tickets_available: availableTickets - 1 }
            : ticket
        );
        setTickets(updatedTickets);
  
        alert("You have bought a ticket for this successfully");
  
        // Make PATCH request after updating the UI
        const response = await fetch(
          "https://stella-events-b.onrender.com/tickets/${event.id}",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tickets_available: availableTickets - 1 }),
          }
        );
  
        if (!response.ok) {
          throw new Error("Error updating ticket");
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      alert("Tickets are sold out for this event!");
    }
  };
  
  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const formatDate = (dateString) => {
    const options = { weekday: "short", day: "2-digit", month: "short" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="Tickets">
      <h2>Available Tickets</h2>
      {selectedTicket ? (
        <div>
          <h3>{selectedTicket.name}</h3>
          <img
            className="TicketImage"
            src={selectedTicket.image_url}
            alt={selectedTicket.name}
          />
          <p>Tickets Available: {selectedTicket.tickets_available}</p>
          <p>Ticket Price: ${selectedTicket.ticket_price}</p>
          <button
            className="BtnBuy"
            onClick={() => handleBuyTicket(selectedTicket)}
          >
            Buy Ticket
          </button>
          <button className="GoBackBtn" onClick={() => setSelectedTicket(null)}>
            Go Back
          </button>
        </div>
      ) : (
        <div>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div
                className="TicketCard"
                key={ticket.id}
                onClick={() => handleTicketClick(ticket)}
              >
                <img
                  className="TicketImage"
                  src={ticket.image_url}
                  alt={ticket.name}
                />
                <h3>{ticket.name}</h3>
              </div>
            ))
          ) : (
            <p>No tickets found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketList;