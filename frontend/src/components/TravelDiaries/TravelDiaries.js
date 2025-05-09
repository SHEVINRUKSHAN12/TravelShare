import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserNav from '../Navbar/UserNav'; // Changed import from Navbar to UserNav
import { toast } from 'react-toastify';
import PostModal from './PostModal'; // Import the modal component for detailed view

// Inline Styles
const styles = {
  pageContainer: {
    position: 'relative',
    paddingTop: '80px',
    minHeight: '100vh',
  },
  bgVideo: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -2,
  },
  videoOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker overlay for readability
    zIndex: -1,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '2rem 1rem',
    flexWrap: 'wrap',
  },
  header: {
    color: '#fff', // Changed to white for better contrast with video background
    margin: '0 1rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add text shadow for better readability
  },
  createButton: {
    padding: '0.7rem 1.5rem',
    backgroundColor: '#28a745',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // Add shadow to button
  },
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '1rem',
    position: 'relative', // Ensure it's positioned relative to the page container
    zIndex: 1, // Ensure it appears above the video overlay
  },
  card: {
    width: '300px',
    margin: '15px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  cardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '15px',
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  cardDescription: {
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '10px',
  },
  cardTags: {
    fontSize: '0.8rem',
    color: '#007bff',
  },
};

function TravelDiaries() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null); // State for the selected post

  // Path to video file - same as home page and create form
  const videoPath = "/assets/Travel1.mp4";

  // Fetch posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Use the correct URL for the first photo
      const transformedPosts = data.map(post => ({
        ...post,
        imageUrl: post.photoUrls && post.photoUrls.length > 0
          ? `http://localhost:8080/uploads/posts/${post.photoUrls[0]}`
          : '/assets/placeholder-image.png',
      }));

      setPosts(transformedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts. Please try again later.");
      toast.error("Failed to fetch posts: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const openPostModal = (post) => {
    setSelectedPost(post);
  };

  const closePostModal = () => {
    setSelectedPost(null);
  };

  return (
    <div style={styles.pageContainer}>
      <UserNav />
      <video style={styles.bgVideo} src={videoPath} autoPlay loop muted />
      <div style={styles.videoOverlay}></div>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Travel Diaries</h1>
        <Link to="/create" style={styles.createButton}>Create New Post</Link>
      </div>
      <div style={styles.gridContainer}>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {posts.map(post => (
          <div 
            key={post.id} 
            style={styles.card} 
            onClick={() => openPostModal(post)}
          >
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              style={styles.cardImage} 
            />
            <div style={styles.cardContent}>
              <h2 style={styles.cardTitle}>{post.title}</h2>
              <p style={styles.cardDescription}>{post.description}</p>
              <p style={styles.cardTags}>{post.tags.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedPost && (
        <PostModal 
          post={selectedPost} 
          onClose={closePostModal} 
        />
      )}
    </div>
  );
} // <-- This closing brace was missing

export default TravelDiaries;
