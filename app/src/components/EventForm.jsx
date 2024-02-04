import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventForm = ({ user }) => {
  const initialFormData = {
    title: '',
    description: '',
    date: null,
    location: '',
    image_url: '',
    tickets_available: 0,
    ticket_price: 0,
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'date' ? new Date(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      location: formData.location,
      image_url: formData.image_url,
      tickets_available: formData.tickets_available,
      ticket_price: formData.ticket_price,
     
    };

    try {
      const response = await fetch('https://stella-events-b.onrender.com/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        console.log('Event created successfully.');
        
        setFormData({ ...initialFormData });
      } else {
        console.error('Error creating event:', await response.json());
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div>
      <h2>Create an Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
        <button type="submit">Create Event</button>
        </div>
        <div>
          <label>Date:</label>
          <DatePicker
            selected={formData.date}
            onChange={(selectedDate) =>
              handleChange({
                target: { name: 'date', value: selectedDate },
              })
            }
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tickets Available:</label>
          <input
            type="number"
            name="tickets_available"
            value={formData.tickets_available}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ticket Price:</label>
          <input
            type="number"
            name="ticket_price"
            value={formData.ticket_price}
            onChange={handleChange}
            required
          />
        </div>
        
      </form>
    </div>
  );
};

export default EventForm;