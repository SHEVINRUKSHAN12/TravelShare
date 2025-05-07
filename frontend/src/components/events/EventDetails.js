import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/events';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAttending, setIsAttending] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError("Failed to load event details. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleAttendEvent = async () => {
    try {
      let response;
      
      if (!isAttending) {
        // Register attendance
        response = await axios.post(`${API_URL}/${id}/attend`);
        alert("You've successfully registered for this event!");
      } else {
        // Cancel attendance
        response = await axios.post(`${API_URL}/${id}/cancel`);
        alert("You've cancelled your registration for this event.");
      }
      
      // Update event with new attendee count
      setEvent(response.data);
      setIsAttending(!isAttending);
      
    } catch (err) {
      console.error('Error updating attendance:', err);
      alert('Failed to update attendance. Please try again.');
    }
  };

  const handleDeleteEvent = async () => {
    if (window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        navigate('/events', { state: { message: 'Event deleted successfully' } });
      } catch (err) {
        console.error('Error deleting event:', err);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '20px',
    },
    backLink: {
      display: 'inline-flex',
      alignItems: 'center',
      color: '#64748b',
      marginBottom: '20px',
      fontSize: '14px',
    },
    backIcon: {
      marginRight: '5px',
    },
    header: {
      position: 'relative',
      borderRadius: '10px',
      overflow: 'hidden',
      marginBottom: '30px',
    },
    coverImage: {
      width: '100%',
      height: '400px',
      objectFit: 'cover',
    },
    overlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
      padding: '30px 20px 20px',
      color: 'white',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    metadata: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      marginBottom: '10px',
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
    },
    icon: {
      marginRight: '8px',
    },
    category: {
      display: 'inline-block',
      background: 'rgba(255,255,255,0.2)',
      padding: '5px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
    actionButtons: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      display: 'flex',
      gap: '10px',
    },
    editButton: {
      backgroundColor: 'rgba(245, 158, 11, 0.9)',
      color: 'white',
      padding: '8px 15px',
      borderRadius: '6px',
      fontSize: '14px',
      display: 'inline-flex',
      alignItems: 'center',
    },
    deleteButton: {
      backgroundColor: 'rgba(239, 68, 68, 0.9)',
      color: 'white',
      padding: '8px 15px',
      borderRadius: '6px',
      fontSize: '14px',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
    },
    buttonIcon: {
      marginRight: '5px',
    },
    content: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '30px',
    },
    mainContent: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    sideContent: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      alignSelf: 'start',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#1e3a8a',
      paddingBottom: '10px',
      borderBottom: '1px solid #e2e8f0',
    },
    description: {
      fontSize: '16px',
      lineHeight: '1.7',
      color: '#334155',
      whiteSpace: 'pre-line',
      marginBottom: '30px',
    },
    listWrapper: {
      marginBottom: '30px',
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      margin: '10px 0',
      fontSize: '16px',
      color: '#334155',
    },
    checkIcon: {
      color: '#4ade80',
      marginRight: '10px',
    },
    itineraryDay: {
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '5px',
    },
    itineraryText: {
      paddingLeft: '20px',
      marginBottom: '15px',
      color: '#334155',
    },
    infoItem: {
      display: 'flex',
      marginBottom: '15px',
    },
    infoLabel: {
      width: '140px',
      fontWeight: 'bold',
      color: '#64748b',
    },
    infoText: {
      flex: '1',
      color: '#334155',
    },
    attendButton: {
      backgroundColor: isAttending ? '#ef4444' : '#4ade80',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '14px 0',
      fontWeight: 'bold',
      fontSize: '16px',
      width: '100%',
      cursor: 'pointer',
      marginTop: '15px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'background-color 0.2s ease',
    },
    attendeeCount: {
      backgroundColor: '#f1f5f9',
      borderRadius: '8px',
      padding: '15px',
      marginTop: '20px',
      textAlign: 'center',
    },
    reviewSection: {
      marginTop: '40px',
    },
    reviewCard: {
      padding: '15px',
      borderRadius: '8px',
      backgroundColor: '#f8fafc',
      marginBottom: '15px',
    },
    reviewHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
    },
    reviewUser: {
      fontWeight: 'bold',
      color: '#1e3a8a',
    },
    rating: {
      color: '#f59e0b',
    },
    reviewText: {
      fontSize: '14px',
      color: '#334155',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '300px',
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '4px solid rgba(0, 0, 0, 0.1)',
      borderLeftColor: '#3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
    errorContainer: {
      textAlign: 'center',
      padding: '50px 0',
    },
    errorMessage: {
      color: '#ef4444',
      fontSize: '18px',
      marginBottom: '20px',
    },
    responsiveContent: {
      gridTemplateColumns: '1fr',
    },
  };

  // Check if we're on mobile/small screen
  const mobileView = window.innerWidth < 768;
  
  // Adjust styles for mobile
  const contentStyle = mobileView 
    ? { ...styles.content, ...styles.responsiveContent } 
    : styles.content;

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <div style={styles.errorMessage}>{error}</div>
          <Link to="/events" style={styles.backLink}>
            <i className="fas fa-arrow-left" style={styles.backIcon}></i>
            Return to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Link to="/events" style={styles.backLink}>
        <i className="fas fa-arrow-left" style={styles.backIcon}></i>
        Back to Events
      </Link>

      <div style={styles.header}>
        <img src={event.imageUrl} alt={event.title} style={styles.coverImage} />
        
        <div style={styles.overlay}>
          <h1 style={styles.title}>{event.title}</h1>
          
          <div style={styles.metadata}>
            <div style={styles.metaItem}>
              <i className="far fa-calendar-alt" style={styles.icon}></i>
              {formatDate(event.date)}
            </div>
            <div style={styles.metaItem}>
              <i className="far fa-clock" style={styles.icon}></i>
              {event.time}
            </div>
            <div style={styles.metaItem}>
              <i className="fas fa-map-marker-alt" style={styles.icon}></i>
              {event.location}
            </div>
            <div style={styles.metaItem}>
              <i className="far fa-user" style={styles.icon}></i>
              {event.organizer}
            </div>
          </div>
          
          <span style={styles.category}>{event.category}</span>
        </div>
        
        <div style={styles.actionButtons}>
          <Link to={`/events/edit/${event.id}`} style={styles.editButton}>
            <i className="far fa-edit" style={styles.buttonIcon}></i>
            Edit
          </Link>
          <button onClick={handleDeleteEvent} style={styles.deleteButton}>
            <i className="far fa-trash-alt" style={styles.buttonIcon}></i>
            Delete
          </button>
        </div>
      </div>

      <div style={contentStyle}>
        <div style={styles.mainContent}>
          <h2 style={styles.sectionTitle}>About This Event</h2>
          <p style={styles.description}>{event.description}</p>
          
          {event.itinerary && event.itinerary.length > 0 && (
            <div style={styles.listWrapper}>
              <h2 style={styles.sectionTitle}>Itinerary</h2>
              {event.itinerary.map((item, index) => (
                <div key={index}>
                  <h3 style={styles.itineraryDay}>{item.day}</h3>
                  <p style={styles.itineraryText}>{item.activities}</p>
                </div>
              ))}
            </div>
          )}
          
          {event.whatToBring && event.whatToBring.length > 0 && (
            <div style={styles.listWrapper}>
              <h2 style={styles.sectionTitle}>What to Bring</h2>
              {event.whatToBring.map((item, index) => (
                <div key={index} style={styles.listItem}>
                  <i className="fas fa-check" style={styles.checkIcon}></i>
                  {item}
                </div>
              ))}
            </div>
          )}
          
          {event.reviews && event.reviews.length > 0 && (
            <div style={styles.reviewSection}>
              <h2 style={styles.sectionTitle}>Traveler Reviews</h2>
              {event.reviews.map((review, index) => (
                <div key={index} style={styles.reviewCard}>
                  <div style={styles.reviewHeader}>
                    <div style={styles.reviewUser}>{review.user}</div>
                    <div style={styles.rating}>
                      {[...Array(review.rating)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                      {[...Array(5 - review.rating)].map((_, i) => (
                        <i key={i+5} className="far fa-star"></i>
                      ))}
                    </div>
                  </div>
                  <p style={styles.reviewText}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div style={styles.sideContent}>
          <h2 style={styles.sectionTitle}>Event Details</h2>
          
          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>Duration:</div>
            <div style={styles.infoText}>{event.duration}</div>
          </div>
          
          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>Difficulty:</div>
            <div style={styles.infoText}>{event.difficulty}</div>
          </div>
          
          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>Meeting Point:</div>
            <div style={styles.infoText}>{event.meetingPoint}</div>
          </div>
          
          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>Contact Email:</div>
            <div style={styles.infoText}>
              <a href={`mailto:${event.contactEmail}`} style={{color: '#3b82f6'}}>
                {event.contactEmail}
              </a>
            </div>
          </div>
          
          {event.contactPhone && (
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>Contact Phone:</div>
              <div style={styles.infoText}>
                <a href={`tel:${event.contactPhone}`} style={{color: '#3b82f6'}}>
                  {event.contactPhone}
                </a>
              </div>
            </div>
          )}
          
          <button 
            style={styles.attendButton} 
            onClick={handleAttendEvent}
          >
            <i className={`fas ${isAttending ? 'fa-times' : 'fa-check'}`} style={styles.buttonIcon}></i>
            {isAttending ? 'Cancel Registration' : 'Attend This Event'}
          </button>
          
          <div style={styles.attendeeCount}>
            <div style={{fontSize: '20px', fontWeight: 'bold', color: '#1e3a8a'}}>
              {event.currentAttendees} / {event.maxAttendees || 'Unlimited'}
            </div>
            <div style={{color: '#64748b', fontSize: '14px'}}>Attendees</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
