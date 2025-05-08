import React, { useEffect, useState } from 'react';
import UserNav from '../Navbar/UserNav'; // Assuming UserNav is used for logged-in users
import { toast } from 'react-toastify';

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
    marginBottom: '0.5rem',
  },
};

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Replace with the actual ID of the logged-in user
    const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage after login/registration

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

  if (!user) {
    return (
      <div style={userProfileStyles.pageContainer}>
        <UserNav />
        <div style={userProfileStyles.content}>
          <h1 style={userProfileStyles.title}>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div style={userProfileStyles.pageContainer}>
      <UserNav />
      <div style={userProfileStyles.content}>
        <h1 style={userProfileStyles.title}>User Profile</h1>
        <p style={userProfileStyles.infoText}><strong>Name:</strong> {user.name}</p>
        <p style={userProfileStyles.infoText}><strong>Username:</strong> {user.username}</p>
        <p style={userProfileStyles.infoText}><strong>Email:</strong> {user.email}</p>
        {user.profilePicturePath && (
          <img
            src={`http://localhost:8080/uploads/${user.profilePicturePath}`}
            alt="Profile"
            style={{ width: '150px', height: '150px', borderRadius: '50%', marginTop: '1rem' }}
          />
        )}
      </div>
    </div>
  );
}

export default UserProfile;
