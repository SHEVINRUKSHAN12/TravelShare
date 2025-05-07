import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    width: '100%',
    background: 'linear-gradient(to right, #2ecc71, #27ae60, #228b22)', // Green gradient
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem 2.5rem', // Increased padding to make navbar bigger
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1000, // Ensure navbar stays on top of other content
  },
  navbarHidden: {
    transform: 'translateY(-100%)', // Move navbar off-screen
    transition: 'transform 0.3s ease-in-out',
  },
  navbarVisible: {
    transform: 'translateY(0)', // Reset navbar position
    transition: 'transform 0.3s ease-in-out',
  },
  logo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.8rem', // Slightly larger font size
    textDecoration: 'none',
    fontFamily: "'Dancing Script', cursive", // Use a cursive font
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
    color: '#e0ffea', // Lighter green to contrast with navbar
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#27ae60', // Match green gradient theme
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '1rem',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#1e8449', // Darker green for hover effect
  },
};

function Navbar() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  useEffect(() => {
    const handleMouseMove = () => {
      setIsVisible(true); // Show navbar on mouse movement
      setLastInteraction(Date.now()); // Update last interaction time
    };

    const handleInactivity = () => {
      if (Date.now() - lastInteraction > 3000) { // 3 seconds of inactivity
        setIsVisible(false); // Hide navbar
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    const interval = setInterval(handleInactivity, 100); // Check inactivity periodically

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [lastInteraction]);

  // Helper function to determine if a link should have the active style
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        ...styles.navbar,
        ...(isVisible ? styles.navbarVisible : styles.navbarHidden),
      }}
    >
      <Link to="/" style={styles.logo}>
        <span style={{ fontFamily: "'Dancing Script', cursive" }}>𝒯𝓇𝒶𝓋𝑒𝓁</span>
        <span style={{ fontFamily: "'Dancing Script', cursive", color: '#e0ffea' }}>𝒮𝒽𝒶𝓇𝑒</span>
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
        <button
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Login
        </button>
        <Link to="/register" style={{ ...styles.button, textDecoration: 'none' }}> {/* Changed to Link */}
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
