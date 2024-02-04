// Chat.jsx
import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://stellar-events-management-app.onrender.com/reviews')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch messages: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setMessages(data))
      .catch((error) => setError(error.message));
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      fetch('https://stellar-events-management-app.onrender.com/add_review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to send review: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setMessages([...messages, data.review]))
        .catch((error) => setError(error.message));
  
      setMessage('');
    }
  };
  

  return (
    <div>
      <button onClick={() => setShowChat(!showChat)}>
        {showChat ? 'Hide Review' : 'Show Review'}
      </button>
      {showChat && (
        <div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <ul>
            {messages.map((msg) => (
              <li key={msg.id}>{msg.text}</li>
            ))}
          </ul>
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Chat;
