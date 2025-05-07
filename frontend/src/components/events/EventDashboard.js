import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/events';

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let url = API_URL;
        if (filter !== 'all') {
          url = `${API_URL}/category/${filter}`;
        }
        
        const response = await axios.get(url);
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filter]);

  // Filter events by search query
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  // Handle search with API
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/search?query=${searchQuery}`);
        setEvents(response.data);
      } catch (err) {
        console.error('Error searching events:', err);
        setError('Failed to search events. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        // Remove event from state after successful deletion
        setEvents(events.filter(event => event.id !== id));
      } catch (err) {
        console.error('Error deleting event:', err);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      flexWrap: 'wrap',
    },
    heading: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      margin: '0 0 10px 0',
    },
    createButton: {
      backgroundColor: '#4ade80',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      fontWeight: 'bold',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
    },
    buttonIcon: {
      marginRight: '8px',
    },
    filterSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px',
      flexWrap: 'wrap',
      width: '100%',
    },
    filterGroup: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      marginBottom: '15px',
    },
    filterButton: {
      padding: '8px 15px',
      backgroundColor: '#f1f5f9',
      border: '1px solid #e2e8f0',
      borderRadius: '20px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    filterButtonActive: {
      backgroundColor: '#1e3a8a',
      color: 'white',
      border: '1px solid #1e3a8a',
    },
    searchBar: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#f1f5f9',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '8px 15px',
      width: '300px',
      maxWidth: '100%',
    },
    searchInput: {
      border: 'none',
      backgroundColor: 'transparent',
      width: '100%',
      fontSize: '14px',
      padding: '5px',
      outline: 'none',
    },
    searchIcon: {
      color: '#94a3b8',
      marginRight: '10px',
    },
    eventsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '25px',
    },
    noEvents: {
      textAlign: 'center',
      padding: '40px 0',
      color: '#64748b',
      fontSize: '18px',
    },
    noEventsIcon: {
      fontSize: '40px',
      marginBottom: '15px',
      color: '#94a3b8',
    },
    loadingContainer: {
      textAlign: 'center',
      padding: '40px 0',
      color: '#64748b',
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '3px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '50%',
      borderTop: '3px solid #3b82f6',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 20px',
    },
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Travel Events & Meetups</h1>
        <Link to="/events/create" style={styles.createButton}>
          <i className="fas fa-plus" style={styles.buttonIcon}></i> Create Event
        </Link>
      </div>

      <div style={styles.filterSection}>
        <div style={styles.filterGroup}>
          <button 
            style={{
              ...styles.filterButton,
              ...(filter === 'all' ? styles.filterButtonActive : {})
            }} 
            onClick={() => setFilter('all')}
          >
            All Events
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(filter === 'hiking' ? styles.filterButtonActive : {})
            }} 
            onClick={() => setFilter('hiking')}
          >
            Hiking
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(filter === 'water sports' ? styles.filterButtonActive : {})
            }} 
            onClick={() => setFilter('water sports')}
          >
            Water Sports
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(filter === 'roadtrip' ? styles.filterButtonActive : {})
            }} 
            onClick={() => setFilter('roadtrip')}
          >
            Road Trips
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(filter === 'food' ? styles.filterButtonActive : {})
            }} 
            onClick={() => setFilter('food')}
          >
            Food Tours
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(filter === 'cultural' ? styles.filterButtonActive : {})
            }} 
            onClick={() => setFilter('cultural')}
          >
            Cultural
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(filter === 'photography' ? styles.filterButtonActive : {})
            }} 
            onClick={() => setFilter('photography')}
          >
            Photography
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(filter === 'wildlife' ? styles.filterButtonActive : {})
            }} 
            onClick={() => setFilter('wildlife')}
          >
            Wildlife & Nature
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(filter === 'adventure' ? styles.filterButtonActive : {})
            }} 
            onClick={() => setFilter('adventure')}
          >
            Adventure & Extreme
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(filter === 'wellness' ? styles.filterButtonActive : {})
            }} 
            onClick={() => setFilter('wellness')}
          >
            Wellness & Retreat
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(filter === 'other' ? styles.filterButtonActive : {})
            }} 
            onClick={() => setFilter('other')}
          >
            Other
          </button>
        </div>

        <form onSubmit={handleSearch} style={styles.searchBar}>
          <i className="fas fa-search" style={styles.searchIcon}></i>
          <input 
            type="text"
            placeholder="Search events..."
            style={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {error && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#ef4444' }}>
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Loading events...</p>
        </div>
      ) : filteredEvents.length > 0 ? (
        <div style={styles.eventsGrid}>
          {filteredEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onDelete={() => handleDeleteEvent(event.id)} 
            />
          ))}
        </div>
      ) : (
        <div style={styles.noEvents}>
          <i className="fas fa-calendar-times" style={styles.noEventsIcon}></i>
          <p>No events found. Try changing your filters or create a new event!</p>
        </div>
      )}
    </div>
  );
};

export default EventDashboard;
