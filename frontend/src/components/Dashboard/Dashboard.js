import React, { useEffect, useState } from 'react';
import UserNav from '../Navbar/UserNav'; // Assuming UserNav is used for logged-in users
import { toast } from 'react-toastify';
import { FaBars, FaArrowLeft } from 'react-icons/fa'; // Icons for sidebar toggle

const styles = {
  dashboardContainer: {
    display: 'flex',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    paddingTop: '80px', // Ensure content starts below the navbar
  },
  sidebar: {
    position: 'fixed', // Fix the sidebar to the left of the screen
    top: 0, // Align with the navbar
    left: 0,
    height: '100vh', // Full height of the viewport
    width: '250px',
    backgroundColor: '#27ae60', // Match the navbar's green theme
    color: '#fff', // White text for contrast
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'width 0.3s',
  },
  sidebarCollapsed: {
    width: '60px',
    padding: '20px 5px',
    alignItems: 'center',
  },
  toggleIcon: {
    fontSize: '1.8rem', // Slightly larger for better visibility
    color: '#fff', // White icon for contrast
    cursor: 'pointer',
    marginBottom: '20px',
    marginTop: '60px', // Move the toggle button further down
    transition: 'color 0.3s ease', // Smooth hover effect
  },
  toggleIconHover: {
    color: '#d4efdf', // Lighter green on hover
  },
  userBox: {
    background: '#2ecc71', // Slightly lighter green for the user box
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    borderRadius: '10px',
    padding: '18px 12px',
    marginBottom: '30px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'opacity 0.3s',
    wordBreak: 'break-all',
  },
  navLinks: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
  },
  navLink: {
    padding: '10px 15px',
    margin: '5px 0',
    textDecoration: 'none',
    color: '#fff', // White text for links
    fontSize: '1rem',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    display: 'block',
    textAlign: 'center',
    borderTop: '1px solid #fff', // Add white line above
    borderBottom: '1px solid #fff', // Add white line below
  },
  navLinkHover: {
    backgroundColor: '#1e8449', // Darker green for hover effect
  },
  navLinkCollapsed: {
    padding: '10px 0',
    fontSize: '1.3rem',
  },
  profileIcon: {
    color: '#fff', // White color for the profile icon
    fontSize: '1.5rem',
    marginRight: '10px',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    marginLeft: '250px', // Add margin to account for the sidebar width
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  welcomeMessage: {
    fontSize: '1.5rem',
    color: '#555',
    textAlign: 'center',
    marginBottom: '20px',
  },
  contentBox: {
    width: '90%',
    maxWidth: '1200px',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
  },
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    if (!userId) {
      toast.error('No user ID found. Please log in.');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          toast.error('Failed to fetch user profile.');
        }
      } catch (error) {
        toast.error('An error occurred while fetching the user profile.');
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    // Clear user data and redirect to login
    localStorage.removeItem('userId');
    window.location.href = '/travelshare/login'; // Redirect to login page
  };

  if (!user) {
    return (
      <div style={styles.dashboardContainer}>
        <UserNav />
        <div style={styles.mainContent}>
          <h1 style={styles.welcomeMessage}>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <UserNav /> {/* Always visible at the top */}
      <div style={styles.dashboardContainer}>
        {/* Sidebar */}
        <div style={sidebarOpen ? styles.sidebar : { ...styles.sidebar, ...styles.sidebarCollapsed }}>
          <div
            style={styles.toggleIcon}
            onClick={() => setSidebarOpen((open) => !open)}
            title={sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
            onMouseEnter={(e) => (e.target.style.color = styles.toggleIconHover.color)}
            onMouseLeave={(e) => (e.target.style.color = styles.toggleIcon.color)}
          >
            {sidebarOpen ? <FaArrowLeft /> : <FaBars />}
          </div>
          <div style={{ ...styles.userBox, opacity: sidebarOpen ? 1 : 0, height: sidebarOpen ? 'auto' : 0, overflow: 'hidden' }}>
            {user.username}
          </div>
          <ul style={styles.navLinks}>
            <li>
              <a
                href="/travelshare/dashboard"
                style={sidebarOpen ? styles.navLink : { ...styles.navLink, ...styles.navLinkCollapsed }}
                title="Dashboard"
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.navLinkHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                {sidebarOpen ? 'Dashboard' : '🏠'}
              </a>
            </li>
            <li>
              <a
                href="/travelshare/diaries"
                style={sidebarOpen ? styles.navLink : { ...styles.navLink, ...styles.navLinkCollapsed }}
                title="Travel Diaries"
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.navLinkHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                {sidebarOpen ? 'Travel Diaries' : '📖'}
              </a>
            </li>
            <li>
              <a
                href="/travelshare/planning"
                style={sidebarOpen ? styles.navLink : { ...styles.navLink, ...styles.navLinkCollapsed }}
                title="Trip Planning"
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.navLinkHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                {sidebarOpen ? 'Trip Planning' : '🗺️'}
              </a>
            </li>
            <li>
              <a
                href="/travelshare/guides"
                style={sidebarOpen ? styles.navLink : { ...styles.navLink, ...styles.navLinkCollapsed }}
                title="Destination Guides"
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.navLinkHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                {sidebarOpen ? 'Destination Guides' : '📍'}
              </a>
            </li>
            <li>
              <a
                href="/travelshare/events"
                style={sidebarOpen ? styles.navLink : { ...styles.navLink, ...styles.navLinkCollapsed }}
                title="Event Management"
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.navLinkHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                {sidebarOpen ? 'Event Management' : '🎉'}
              </a>
            </li>
            <li>
              <a
                href="/travelshare/profile"
                style={sidebarOpen ? styles.navLink : { ...styles.navLink, ...styles.navLinkCollapsed }}
                title="Profile"
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.navLinkHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                <span style={styles.profileIcon}>👤</span>
                {sidebarOpen ? 'Profile' : ''}
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  ...styles.navLink,
                  ...(sidebarOpen ? {} : styles.navLinkCollapsed),
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex', // Ensure proper alignment
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px 15px', // Match padding with other buttons
                  width: '100%', // Ensure it spans the same width as other buttons
                }}
                title="Logout"
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.navLinkHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                {sidebarOpen ? 'Logout' : '🚪'}
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          <p style={styles.welcomeMessage}>Hello, <span style={{ color: '#27ae60', fontWeight: 'bold' }}>{user.name}</span>! We're glad to have you here.</p>
          <div style={styles.contentBox}>
            <p>Explore your travel plans, share your experiences, and connect with fellow travelers.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
