import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EventList = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('https://stella-events-b.onrender.com/events')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };
  

  return (
    <div>
      <h2>Upcoming Events</h2>
      <p>Buy tickets in advance for popular events</p>
      {isModalOpen && selectedEvent && (
        <div className="EventModal">
          <div className="ModalContent">
            <h2>{selectedEvent.title}</h2>
            <p>{selectedEvent.description}</p>
            <p>Date: {formatDate(selectedEvent.date)}</p>
            <p>Location: {selectedEvent.location}</p>
            <img className='Event_img' src={selectedEvent.image_url} alt={selectedEvent.title} />
            <br />
            <button className="CloseButton" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}

      {!isModalOpen &&
        events.map((event) => (
          <div
            className="EventCard"
            key={event.id}
            onClick={() => handleEventClick(event)}
          >
            <h3>{event.title}</h3>
            <img className="image" src={event.image_url} alt={event.title} />
          </div>
        ))}

      {user && <Link to="/user-dashboard">Go to User Dashboard</Link>}
    </div>
  );
};

export default EventList;