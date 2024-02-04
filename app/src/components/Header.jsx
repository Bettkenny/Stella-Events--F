import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, logout }) => {
  return (
    <header className="Headers">
      <nav>
        <Link to="/" className="HomeRoute">
          <img width="40" height="40" src="https://img.icons8.com/50/000000/home.png" alt="home" />
        </Link>
        <Link to="/about" className="AboutRoute">
          About
        </Link>
        <Link to="/events" className="EventsRoute">
          Events
        </Link>
        {/* <Link to="/tickets" className="TicketsRoute">
          Tickets
        </Link> */}
        {user ? (
          <>
            <Link to="/dashboard" className="DashboardRoute">
              Dashboard
            </Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup" className="SignupRoute">
              Signup
            </Link>
            <Link to="/login" className="LoginRoute">
              Login
            </Link>
          </>
        )}
        {/* {user && user.role === 'admin' && ( */}
          <Link to="/admin" className="AdminRoute">
            Admin
          </Link>
        {/* // )} */}
        <Link to="/chat" className="ChatRoute">
          Chat
        </Link>
      </nav>
    </header>
  );
};

export default Header;