import React, { useEffect, useState } from 'react';
import UserNav from '../Navbar/UserNav'; // Assuming UserNav is used for logged-in users
import { toast } from 'react-toastify';

const styles = {
  pageContainer: {
    paddingTop: '80px', // Adjust based on UserNav height
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  },
  profileHeader: {
    width: '100%',
    backgroundColor: '#27ae60',
    color: '#fff',
    padding: '40px 20px',
    textAlign: 'center',
    position: 'relative',
  },
  profilePicture: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    border: '5px solid #fff',
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ddd',
    objectFit: 'cover',
  },
  profileName: {
    marginTop: '80px',
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  profileDetails: {
    fontSize: '1.2rem',
    color: '#f0f0f0',
    marginTop: '10px',
  },
  profileTabs: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '60px',
    borderBottom: '1px solid #ddd',
  },
  tab: {
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#555',
    borderBottom: '3px solid transparent',
    transition: 'border-color 0.3s ease',
  },
  activeTab: {
    borderBottom: '3px solid #27ae60',
    color: '#27ae60',
  },
  contentContainer: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '800px',
  },
  infoText: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '0.5rem',
  },
  followersList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  followerItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    alignItems: 'center',
  },
  followerPicture: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
    backgroundColor: '#ddd',
  },
  followerName: {
    fontSize: '1rem',
    color: '#333',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '1rem',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
    marginRight: '10px',
  },
  buttonDanger: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
};

function UserProfile() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('About');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
  });

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
          setFormData({ name: data.name, username: data.username });
        } else {
          toast.error('Failed to fetch user profile.');
        }
      } catch (error) {
        toast.error('An error occurred while fetching the user profile.');
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setEditMode(false);
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the profile.');
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${user.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Profile deleted successfully!');
        localStorage.removeItem('userId');
        window.location.href = '/travelshare/login';
      } else {
        toast.error('Failed to delete profile.');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the profile.');
    }
  };

  if (!user) {
    return (
      <div style={styles.pageContainer}>
        <UserNav />
        <div style={styles.contentContainer}>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'About':
        return editMode ? (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={user.email}
                disabled
                style={styles.input}
              />
            </div>
            <button style={styles.button} onClick={handleSaveChanges}>Save Changes</button>
            <button style={styles.buttonDanger} onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p style={styles.infoText}><strong>Name:</strong> {user.name}</p>
            <p style={styles.infoText}><strong>Username:</strong> {user.username}</p>
            <p style={styles.infoText}><strong>Email:</strong> {user.email}</p>
            <button style={styles.button} onClick={() => setEditMode(true)}>Edit Profile</button>
            <button style={styles.buttonDanger} onClick={handleDeleteProfile}>Delete Profile</button>
          </>
        );
      case 'Posts':
        return <p style={styles.infoText}>User posts will be displayed here.</p>;
      case 'Followers':
        return (
          <ul style={styles.followersList}>
            <li style={styles.followerItem}>
              <div style={styles.followerPicture}></div>
              <span style={styles.followerName}>John Doe</span>
            </li>
            <li style={styles.followerItem}>
              <div style={styles.followerPicture}></div>
              <span style={styles.followerName}>Jane Smith</span>
            </li>
            <li style={styles.followerItem}>
              <div style={styles.followerPicture}></div>
              <span style={styles.followerName}>Alice Johnson</span>
            </li>
          </ul>
        );
      case 'Following':
        return (
          <ul style={styles.followersList}>
            <li style={styles.followerItem}>
              <div style={styles.followerPicture}></div>
              <span style={styles.followerName}>Michael Brown</span>
            </li>
            <li style={styles.followerItem}>
              <div style={styles.followerPicture}></div>
              <span style={styles.followerName}>Emily Davis</span>
            </li>
            <li style={styles.followerItem}>
              <div style={styles.followerPicture}></div>
              <span style={styles.followerName}>Chris Wilson</span>
            </li>
          </ul>
        );
      case 'Settings':
        return <p style={styles.infoText}>User settings will be displayed here.</p>;
      default:
        return null;
    }
  };

  return (
    <div style={styles.pageContainer}>
      <UserNav />
      <div style={styles.profileHeader}>
        {user.profilePicturePath ? (
          <img
            src={`http://localhost:8080/uploads/${user.profilePicturePath}`}
            alt="Profile"
            style={styles.profilePicture}
          />
        ) : (
          <div style={styles.profilePicture}></div>
        )}
        <h1 style={styles.profileName}>{user.name}</h1>
        <p style={styles.profileDetails}>@{user.username} | {user.email}</p>
      </div>
      <div style={styles.profileTabs}>
        {['About', 'Posts', 'Followers', 'Following', 'Settings'].map((tab) => (
          <div
            key={tab}
            style={activeTab === tab ? { ...styles.tab, ...styles.activeTab } : styles.tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div style={styles.contentContainer}>
        {renderTabContent()}
      </div>
    </div>
  );
}

export default UserProfile;
