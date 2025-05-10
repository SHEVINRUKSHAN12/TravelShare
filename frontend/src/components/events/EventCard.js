import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const styles = {
    card: {
      backgroundColor: 'white',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    imageContainer: {
      height: '180px',
      overflow: 'hidden',
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease',
    },
    category: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'rgba(30, 58, 138, 0.8)',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
    content: {
      padding: '20px',
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#1e3a8a',
    },
    description: {
      color: '#64748b',
      fontSize: '14px',
      marginBottom: '15px',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis',
    },
    metadata: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: '15px',
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      color: '#64748b',
    },
    icon: {
      marginRight: '8px',
      color: '#1e3a8a',
      width: '16px',
      textAlign: 'center',
    },
    footer: {
      marginTop: 'auto',
      display: 'flex',
      justifyContent: 'space-between',
      borderTop: '1px solid #e2e8f0',
      paddingTop: '15px',
    },
    attendees: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      color: '#64748b',
    },
    actions: {
      display: 'flex',
      gap: '10px',
    },
    viewButton: {
      backgroundColor: '#1e3a8a',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '6px',
      textDecoration: 'none',
      fontSize: '14px',
      display: 'inline-flex',
      alignItems: 'center',
    },
    editButton: {
      backgroundColor: '#f59e0b',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '6px',
      textDecoration: 'none',
      fontSize: '14px',
      display: 'inline-flex',
      alignItems: 'center',
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      color: 'white',
      padding: '8px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
    },
    buttonIcon: {
      marginRight: '4px',
    },
    hover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
    },
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      style={{
        ...styles.card,
        ...(isHovered ? styles.hover : {})
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.imageContainer}>
        <img 
          src={event.imageUrl} 
          alt={event.title}
          style={{
            ...styles.image,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        <span style={styles.category}>{event.category}</span>
      </div>
      
      <div style={styles.content}>
        <h3 style={styles.title}>{event.title}</h3>
        <p style={styles.description}>{event.description}</p>
        
        <div style={styles.metadata}>
          <div style={styles.metaItem}>
            <i className="far fa-calendar-alt" style={styles.icon}></i>
            {formatDate(event.date)}
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
        
        <div style={styles.footer}>
          <div style={styles.attendees}>
            <i className="fas fa-users" style={styles.icon}></i>
            {event.attendees} Attendees
          </div>
          
          <div style={styles.actions}>
            <Link to={`/events/${event.id}`} style={styles.viewButton}>
              <i className="far fa-eye" style={styles.buttonIcon}></i>
              View
            </Link>
            <Link to={`/events/edit/${event.id}`} style={styles.editButton}>
              <i className="far fa-edit" style={styles.buttonIcon}></i>
              Edit
            </Link>
            <button 
              style={styles.deleteButton}
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
            >
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
