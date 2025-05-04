import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 2rem',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1000, // Ensure navbar stays on top of other content
  },
  logo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    color: '#fff',
    margin: '0 1rem',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  },
  activeNavLink: {
    color: '#5DADE2', // Highlight color for active link
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#5DADE2',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '1rem',
  },
};

function Navbar() {
  const location = useLocation();
  
  // Helper function to determine if a link should have the active style
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>
        TravelPlatform
      </Link>
      <div style={styles.navLinks}>
        <Link 
          to="/" 
          style={{
            ...styles.navLink,
            ...(isActive('/') ? styles.activeNavLink : {})
          }}
        >
          Home
        </Link>
        <Link 
          to="/diaries" 
          style={{
            ...styles.navLink,
            ...(isActive('/diaries') ? styles.activeNavLink : {})
          }}
        >
          Travel Diaries
        </Link>
        {/* Add more nav links as needed */}
        <button style={styles.button}>
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
