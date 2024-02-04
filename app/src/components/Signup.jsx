import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch('https://stella-events-b.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          role, // Include the role in the request body
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('User registered successfully:', data);
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.error('Error signing up:', errorData);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <div>
        <label htmlFor="signupUsername">Username:</label>
        <input type="text" id="signupUsername" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="signupPassword">Password:</label>
        <input type="password" id="signupPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
