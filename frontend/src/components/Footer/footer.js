import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const secondVideoSection = document.querySelector('.second-video-section');
      
      if (secondVideoSection) {
        const rect = secondVideoSection.getBoundingClientRect();
        const isPastSecondVideo = rect.bottom <= window.innerHeight;
        
        // Show footer when scrolling down past the second video
        // Hide footer when scrolling up (regardless of position)
        if (isPastSecondVideo && currentScrollY > lastScrollY) {
          setIsVisible(true);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(false);
        }
        
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const styles = {
    footer: {
      background: 'linear-gradient(to right, #2ecc71, #27ae60, #228b22)', // Match navbar's green gradient
      color: '#fff',
      padding: '2rem 1rem',
      textAlign: 'center',
      position: 'fixed', // Make it sticky
      bottom: 0,
      left: 0,
      width: '100%',
      transform: isVisible ? 'translateY(0)' : 'translateY(100%)', // Show/hide with transform
      transition: 'transform 0.3s ease-in-out',
      zIndex: 990, // Below navbar but above other content
    },
    footerContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
    },
    footerTop: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: '1.5rem',
    },
    footerColumn: {
      flex: 1,
      minWidth: '200px',
      marginBottom: '1rem',
    },
    heading: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
      fontWeight: 'bold',
    },
    paragraph: {
      lineHeight: 1.6,
      marginBottom: '1rem',
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    listItem: {
      marginBottom: '0.5rem',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
    },
    footerBottom: {
      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
      paddingTop: '1rem',
      fontSize: '0.9rem',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContainer}>
        <div style={styles.footerTop}>
          <div style={styles.footerColumn}>
            <h3 style={styles.heading}>TravelShare</h3>
            <p style={styles.paragraph}>
              Connect, share, and explore with fellow travelers around the world.
            </p>
          </div>
          <div style={styles.footerColumn}>
            <h4 style={styles.heading}>Explore</h4>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <Link to="/travel-diaries" style={styles.link}>
                  Travel Diaries
                </Link>
              </li>
              <li style={styles.listItem}>
                <Link to="/destinations" style={styles.link}>
                  Destination Guides
                </Link>
              </li>
              <li style={styles.listItem}>
                <Link to="/trip-planning" style={styles.link}>
                  Trip Planning
                </Link>
              </li>
            </ul>
          </div>
          <div style={styles.footerColumn}>
            <h4 style={styles.heading}>Resources</h4>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <Link to="/about" style={styles.link}>
                  About Us
                </Link>
              </li>
              <li style={styles.listItem}>
                <Link to="/contact" style={styles.link}>
                  Contact
                </Link>
              </li>
              <li style={styles.listItem}>
                <Link to="/faq" style={styles.link}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} TravelShare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
