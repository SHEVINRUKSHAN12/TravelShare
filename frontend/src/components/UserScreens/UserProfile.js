import React from 'react';
import UserNav from '../Navbar/UserNav'; // Assuming UserNav is used for logged-in users

const userProfileStyles = {
  pageContainer: {
    paddingTop: '80px', // Adjust based on UserNav height
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  },
  content: {
    marginTop: '2rem',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '600px',
    width: '90%',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '1rem',
  },
  infoText: {
    fontSize: '1.2rem',
    color: '#555',
  }
};

function UserProfile() {
  // In a real app, you would fetch user data here based on ID or context
  return (
    <div style={userProfileStyles.pageContainer}>
      <UserNav />
      <div style={userProfileStyles.content}>
        <h1 style={userProfileStyles.title}>User Profile</h1>
        <p style={userProfileStyles.infoText}>This is where user profile details will be displayed.</p>
        {/* Add more profile information, edit options, etc. here */}
      </div>
    </div>
  );
}

export default UserProfile;
