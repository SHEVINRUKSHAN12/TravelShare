import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../PostCard/PostCard';
import Navbar from '../Navbar/nav';
import { toast } from 'react-toastify';

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
  }
};

function TravelDiaries() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
      
      // Transform the data to match PostCard component expectations
      const transformedPosts = data.map(post => ({
        id: post.id,
        title: post.title,
        description: post.description,
        author: post.authorName || 'Anonymous',
        tags: post.tags || [],
        createdAt: post.createdAt,
        // Use first photo as card image, or fallback to placeholder
        imageUrl: post.photoUrls && post.photoUrls.length > 0 
          ? post.photoUrls[0]
          : 'https://via.placeholder.com/350x200?text=No+Image',
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

  return (
    <div style={styles.pageContainer}>
      {/* Background Video */}
      <video autoPlay loop muted playsInline style={styles.bgVideo}>
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={styles.videoOverlay}></div>
      
      <Navbar />
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Travel Diaries</h1>
        <Link to="/diaries/new" style={styles.createButton}>
          + Create New Post
        </Link>
      </div>
      
      <div style={styles.gridContainer}>
        {loading ? (
          <p style={{color: '#fff'}}>Loading posts...</p>
        ) : error ? (
          <p style={{color: '#fff'}}>{error}</p>
        ) : posts.length === 0 ? (
          <p style={{color: '#fff'}}>No posts yet! Be the first to share your travel story.</p>
        ) : (
          posts.map(post => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}

export default TravelDiaries;
