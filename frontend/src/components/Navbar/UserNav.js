import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const userNavStyles = {
  navbar: {
    position: 'fixed',
    top: 0,
    width: '100%',
    background: 'linear-gradient(to right, #2ecc71, #27ae60, #228b22)', // Green gradient from main nav
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem 2.5rem',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    color: '#fff', // Text color for logo, etc.
  },
  navbarHidden: {
    transform: 'translateY(-100%)',
    transition: 'transform 0.3s ease-in-out',
  },
  navbarVisible: {
    transform: 'translateY(0)',
    transition: 'transform 0.3s ease-in-out',
  },
  logo: {
    color: '#fff', // Main logo color
    fontWeight: 'bold',
    fontSize: '1.8rem',
    textDecoration: 'none',
    fontFamily: "'Dancing Script', cursive",
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    color: '#fff', // Nav link color from main nav
    margin: '0 1rem',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
  },
  activeNavLink: {
    color: '#e0ffea', // Active nav link color from main nav
    fontWeight: 'bold',
  },
  profileIconLink: { // Style for the profile icon link
    color: '#fff',
    margin: '0 1rem',
    textDecoration: 'none',
    fontSize: '1.5rem', // Make icon a bit larger
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.3s ease',
  },
  profileIconSvg: { // Style for the SVG itself
    width: '24px',
    height: '24px',
    fill: 'currentColor',
  },
  activeProfileIconLink: { // Style for active profile icon link
    color: '#e0ffea',
  },
  button: {
    backgroundColor: '#27ae60', // Button background from main nav
    color: '#fff', // Button text color from main nav
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '1rem',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#1e8449', // Button hover background from main nav
  },
};

function UserNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  useEffect(() => {
    const handleMouseMove = () => {
      setIsVisible(true);
      setLastInteraction(Date.now());
    };

    const handleInactivity = () => {
      if (Date.now() - lastInteraction > 3000) {
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    const interval = setInterval(handleInactivity, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [lastInteraction]);

  const isActive = (path) => location.pathname === path || 
                             (path === '/diaries' && location.pathname.startsWith('/diaries')) ||
                             (path === '/profile' && location.pathname.startsWith('/profile'));

  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing tokens, redirecting)
    console.log("User logged out");
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav
      style={{
        ...userNavStyles.navbar,
        ...(isVisible ? userNavStyles.navbarVisible : userNavStyles.navbarHidden),
      }}
    >
      <Link to="/dashboard" style={userNavStyles.logo}>
        <span style={{ fontFamily: "'Dancing Script', cursive" }}>𝒯𝓇𝒶𝓋𝑒𝓁</span>
        <span style={{ fontFamily: "'Dancing Script', cursive", color: '#e0ffea' }}>𝒮𝒽𝒶𝓇𝑒</span>
      </Link>
      <div style={userNavStyles.navLinks}>
        <Link
          to="/dashboard"
          style={{
            ...userNavStyles.navLink,
            ...(isActive('/dashboard') ? userNavStyles.activeNavLink : {}),
          }}
        >
          Dashboard
        </Link>
        <Link
          to="/diaries"
          style={{
            ...userNavStyles.navLink,
            ...(isActive('/diaries') ? userNavStyles.activeNavLink : {}),
          }}
        >
          Travel Diaries
        </Link>
        {/* Profile Icon Link with SVG */}
        <Link
          to="/profile" // Path to the user profile page
          style={{
            ...userNavStyles.profileIconLink,
            ...(isActive('/profile') ? userNavStyles.activeProfileIconLink : {}),
          }}
          title="Profile" // Tooltip for the icon
        >
          <svg width="24" height="24" viewBox="0 0 24 24" style={userNavStyles.profileIconSvg} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.3 0-9.6 1.7-9.6 4.8v2.4h19.2v-2.4c0-3.1-6.3-4.8-9.6-4.8z"/>
          </svg>
        </Link>
        <button
          onClick={handleLogout}
          style={userNavStyles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = userNavStyles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = userNavStyles.button.backgroundColor)}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default UserNav;
