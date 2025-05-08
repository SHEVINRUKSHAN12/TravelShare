import React from 'react';
import Navbar from '../Navbar/nav';

const styles = {
  dashboardPage: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingTop: '80px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  },
  contentContainer: {
    width: '90%',
    maxWidth: '1200px',
    margin: '2rem auto',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem',
  },
  welcomeText: {
    fontSize: '1.2rem',
    color: '#555',
  },
};

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div style={styles.dashboardPage}>
        <div style={styles.contentContainer}>
          <h1 style={styles.title}>Dashboard</h1>
          <p style={styles.welcomeText}>Welcome to your dashboard! Here you can manage your account and explore features.</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
