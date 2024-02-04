import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Signup from './Signup';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      const response = await fetch('https://stella-events-b.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { access_token, refresh_token,isAdmin } = data;
        setToken(access_token, isAdmin);
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);
        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        const errorData = await response.json();
        setError(`Error logging in: ${errorData.message}`);
      }
    } catch (error) {
      setError(`Error logging in: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label htmlFor="loginUsername">Username:</label>
        <input type="text" id="loginUsername" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="loginPassword">Password:</label>
        <input type="password" id="loginPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
      <Signup />
    </div>
  );
};

export default Login;