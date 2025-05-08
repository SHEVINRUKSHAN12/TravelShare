import React from 'react';
import UserNav from '../Navbar/UserNav';

const styles = {
  pageContainer: {
    paddingTop: '80px',
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
    textAlign: 'left',
    maxWidth: '800px',
    width: '90%',
  },
  section: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem',
  },
  inputGroup: {
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
  },
  buttonHover: {
    backgroundColor: '#1e8449',
  },
};

function Settings() {
  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <div style={styles.pageContainer}>
      <UserNav />
      <div style={styles.content}>
        <h1 style={styles.sectionTitle}>Settings</h1>

        {/* Update User Information Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Update Profile</h2>
          <form onSubmit={handleSave}>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" style={styles.input} />
            </div>
            <button
              type="submit"
              style={styles.button}
              onMouseEnter={e => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseLeave={e => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Change Password Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Change Password</h2>
          <form onSubmit={handleSave}>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="currentPassword">Current Password</label>
              <input type="password" id="currentPassword" placeholder="Enter current password" style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="newPassword">New Password</label>
              <input type="password" id="newPassword" placeholder="Enter new password" style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="confirmPassword">Confirm New Password</label>
              <input type="password" id="confirmPassword" placeholder="Confirm new password" style={styles.input} />
            </div>
            <button
              type="submit"
              style={styles.button}
              onMouseEnter={e => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseLeave={e => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Preferences Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Preferences</h2>
          <form onSubmit={handleSave}>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="notifications">Notifications</label>
              <select id="notifications" style={styles.input}>
                <option value="all">All Notifications</option>
                <option value="email">Email Only</option>
                <option value="none">No Notifications</option>
              </select>
            </div>
            <button
              type="submit"
              style={styles.button}
              onMouseEnter={e => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseLeave={e => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
              Save Preferences
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
