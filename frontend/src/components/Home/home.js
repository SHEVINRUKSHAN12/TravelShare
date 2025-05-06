import React from 'react';
import Navbar from '../Navbar/nav'; // Import the Navbar
import Footer from '../Footer/footer'; // Import the Footer

// Define style objects
const styles = {
  homePage: {
    width: '100%',
  },
  videoSection: {
    position: 'relative',
    width: '100%',
    height: '100vh', // Each video section takes full viewport height
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    scrollSnapAlign: 'start', // Make each section a snap point (align to its start)
  },
  bgVideo: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transform: 'translate(-50%, -50%)',
    zIndex: -2,
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Reduced opacity from 0.5 to 0.3
    zIndex: -1,
  },
  sectionContent: {
    zIndex: 1,
    padding: '2rem',
    maxWidth: '850px', // Slightly wider max-width
  },
  h1: {
    fontSize: '3.5rem', // Slightly larger font size
    marginBottom: '1.5rem', // Increased spacing below h1
    fontWeight: 'bold', // Keep bold
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.6)', // More pronounced shadow
    letterSpacing: '1px', // Add slight letter spacing
  },
  h2: {
    fontSize: '2.5rem', // Slightly smaller for secondary sections
    marginBottom: '1rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  },
  p: {
    fontSize: '1.3rem', // Slightly larger paragraph text
    marginBottom: '2.5rem', // Increased spacing below paragraph
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', // Match h1 shadow intensity
    lineHeight: '1.7', // Improve readability
  },
  ctaButton: {
    padding: '1rem 2rem', // Larger padding
    fontSize: '1.1rem', // Slightly larger font size
    color: '#fff',
    backgroundColor: '#27ae60', // Match navbar's green gradient theme
    border: 'none',
    borderRadius: '8px', // More rounded corners
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Add a subtle shadow to the button
    transition: 'background-color 0.3s ease',
  },
};

function Home() {
  // --- PATH CHECK ---
  // Ensure the 'assets' folder is DIRECTLY inside the 'public' folder.
  // Correct structure: frontend/public/assets/Travel 2.mp4
  // The path below assumes this structure.
  const video1Path = "/assets/Travel1.mp4";
  const video2Path = "/assets/Travel2.mp4";
  // If videos still don't load, check filenames (case-sensitive!) and try renaming
  // files to remove spaces (e.g., Travel-2.mp4) and update paths here.

  return (
    <div style={styles.homePage}>
      <Navbar /> {/* Include the Navbar */}

      {/* Hero Section (First Video) */}
      <section style={styles.videoSection}> {/* Apply videoSection style */}
        <video autoPlay loop muted playsInline style={styles.bgVideo}> {/* Apply bgVideo style */}
          <source src={video1Path} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div style={styles.videoOverlay}></div> {/* Apply videoOverlay style */}
        <div style={styles.sectionContent}> {/* Apply sectionContent style */}
          <h1 style={styles.h1}>Share Your Journey, Inspire Others</h1> {/* Apply h1 style */}
          <p style={styles.p}>Connect with fellow travelers, share experiences, and discover your next adventure.</p> {/* Apply p style */}
          <button style={styles.ctaButton}>Explore Now</button> {/* Apply ctaButton style */}
        </div>
      </section>

      {/* Discover Section (Second Video) */}
      <section style={{ ...styles.videoSection }} className="second-video-section"> {/* Add class */}
        <video autoPlay loop muted playsInline style={styles.bgVideo}> {/* Apply bgVideo style */}
          <source src={video2Path} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div style={styles.videoOverlay}></div> {/* Apply videoOverlay style */}
        <div style={styles.sectionContent}> {/* Apply sectionContent style */}
          <h2 style={styles.h2}>Discover Amazing Destinations</h2> {/* Apply h2 style */}
          <p style={styles.p}>Explore user-submitted guides and find hidden gems around the world.</p> {/* Apply p style */}
        </div>
      </section>

      <Footer /> {/* Include the Footer */}
    </div>
  );
}

export default Home;
