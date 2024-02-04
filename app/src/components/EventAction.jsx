import { useState, useEffect } from 'react';

function EventActions() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://stella-events-b.onrender.com/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  const handleDelete = (eventId) => {
    // Optimistically update the UI
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);

    // Send DELETE request to the backend
    fetch(`https://stella-events-b.onrender.com/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error deleting event: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })    
      .then((data) => console.log('Event deleted from backend:', data))
      .catch((error) => console.error('Error deleting event:', error));
  };

  return (
    <div>
      <h2 className='deleteTitle'>Event Actions</h2>
      {events.map((event) => (
        <div className='EventAction' key={event.id}>
          <p>{event.name}</p>
          <img className='EventImage' src={event.image_url} alt={event.name} />
          <button onClick={() => handleDelete(event.id)}>Cancel</button>
        </div>
      ))}
    </div>
  );
}

export default EventActions;