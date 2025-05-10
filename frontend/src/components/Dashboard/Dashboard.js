import React, { useEffect, useState } from 'react';
import UserNav from '../Navbar/UserNav'; 
import { toast } from 'react-toastify';
import { FaBars, FaArrowLeft, FaComment, FaHeart, FaShare, FaSearch, FaTimes } from 'react-icons/fa';
import PostModal from '../TravelDiaries/PostModal';
import CommentModal from './CommentModal';
import { format } from 'date-fns';

const styles = {
  dashboardContainer: {
    position: 'relative', // Ensure proper layering for the video
    minHeight: '100vh',
    paddingTop: '80px',
    overflow: 'hidden', // Prevent scrolling due to video overflow
  },
  bgVideo: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1, // Place the video behind other content
    filter: 'blur(8px)', // Add blur effect
  },
  videoOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker overlay for readability
    zIndex: -1,
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '250px',
    backgroundColor: '#27ae60',
    color: '#fff',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'width 0.3s',
  },
  sidebarCollapsed: {
    width: '60px',
    padding: '20px 5px',
    alignItems: 'center',
  },
  toggleIcon: {
    fontSize: '1.8rem',
    color: '#fff',
    cursor: 'pointer',
    marginBottom: '20px',
    marginTop: '60px',
    transition: 'color 0.3s ease',
  },
  toggleIconHover: {
    color: '#d4efdf',
  },
  userBox: {
    background: '#2ecc71',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    borderRadius: '10px',
    padding: '18px 12px',
    marginBottom: '30px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'opacity 0.3s',
    wordBreak: 'break-all',
  },
  navLinks: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
  },
  navLink: {
    padding: '10px 15px',
    margin: '5px 0',
    textDecoration: 'none',
    color: '#fff',
    fontSize: '1rem',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    display: 'block',
    textAlign: 'center',
    borderTop: '1px solid #fff',
    borderBottom: '1px solid #fff',
  },
  navLinkHover: {
    backgroundColor: '#1e8449',
  },
  navLinkCollapsed: {
    padding: '10px 0',
    fontSize: '1.3rem',
  },
  profileIcon: {
    color: '#fff',
    fontSize: '1.5rem',
    marginRight: '10px',
  },
  mainContent: {
    position: 'relative', // Ensure content is above the video
    zIndex: 1,
    flex: 1,
    padding: '20px',
    marginLeft: '250px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  welcomeMessage: {
    fontSize: '1.5rem',
    color: '#fff', // Changed to white
    textAlign: 'center',
    marginBottom: '20px',
  },
  userName: {
    color: '#7bed9f', // Light green for the user's name
    fontWeight: 'bold',
  },
  contentBox: {
    width: '90%',
    maxWidth: '1200px',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 'auto',
    padding: '10px 15px',
    backgroundColor: '#c0392b',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    marginBottom: '20px',
  },
  searchContainer: {
    width: '80%',
    maxWidth: '800px',
    marginBottom: '30px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    width: '100%',
    padding: '12px 45px 12px 15px',
    borderRadius: '30px',
    border: '2px solid #27ae60',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
  },
  searchInputFocus: {
    boxShadow: '0 5px 15px rgba(39, 174, 96, 0.3)',
    border: '2px solid #2ecc71',
  },
  searchButton: {
    position: 'absolute',
    right: '5px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    color: '#27ae60',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
    height: '40px',
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonHover: {
    backgroundColor: 'rgba(39, 174, 96, 0.1)',
  },
  clearButton: {
    position: 'absolute',
    right: '50px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    fontSize: '18px',
    color: '#555',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchResults: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#fff',
    padding: '10px 0',
    marginBottom: '20px',
  },
  noResults: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#fff',
    padding: '15px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
    marginBottom: '20px',
  },
};

const postStyles = {
  postContainer: {
    width: '100%',
    maxWidth: '600px', // Increased max width for larger cards
    borderRadius: '12px', // Slightly larger border radius
    backgroundColor: 'rgb(37, 39, 40)', // Updated background color
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // Slightly stronger shadow
    marginBottom: '25px', // Increased margin for better spacing
    overflow: 'hidden',
    border: '1px solid rgb(37, 39, 40)', // Retained border color
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #555', // Inside border for header
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
    backgroundColor: '#27ae60',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  postUserInfo: {
    flex: 1,
    color: '#fff', // Updated text color to white
  },
  postUserName: {
    fontWeight: 'bold',
    fontSize: '14px',
    marginBottom: '2px',
    color: '#fff', // Updated text color to white
  },
  postTime: {
    fontSize: '12px',
    color: '#fff', // Updated text color to white
  },
  postContent: {
    padding: '10px',
    color: '#fff', // Updated text color to white
    borderTop: '1px solid #555', // Inside border for content
  },
  postActions: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
    borderTop: '1px solid #555', // Inside border for actions
  },
  postAction: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#fff', // Updated icon and text color to white
    fontSize: '14px',
  },
  postActionIcon: {
    marginRight: '6px',
    color: '#fff', // Updated icon color to white
  },
  mediaContainer: {
    position: 'relative',
    width: '100%',
    maxHeight: '500px',
    overflow: 'hidden',
  },
  mediaImage: {
    width: '100%',
    height: 'auto', 
    maxHeight: '500px',
    objectFit: 'cover',
    display: 'block',
  },
  mediaVideo: {
    width: '100%',
    height: 'auto',
    maxHeight: '500px',
    objectFit: 'cover',
    display: 'block',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    fontSize: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 10,
    opacity: 0,
    transition: 'opacity 0.2s ease',
  },
  navButtonLeft: {
    left: '10px',
  },
  navButtonRight: {
    right: '10px',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: '10px',
    left: '0',
    right: '0',
    display: 'flex',
    justifyContent: 'center',
    gap: '5px',
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  activeDot: {
    backgroundColor: '#fff',
    transform: 'scale(1.2)',
  },
  mediaContainerHover: {
    '&:hover .navButton': {
      opacity: 1,
    }
  }
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [selectedPostForComment, setSelectedPostForComment] = useState(null);
  const [commentCount, setCommentCount] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);

  const toggleLike = (postId) => {
    setLikedPosts(prevLikedPosts => ({
      ...prevLikedPosts,
      [postId]: !prevLikedPosts[postId]
    }));
  };

  const addComment = async (postId, commentText) => {
    try {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            const comments = post.comments || [];
            return {
              ...post,
              comments: [...comments, commentText]
            };
          }
          return post;
        })
      );
      
      setCommentCount(prev => ({
        ...prev,
        [postId]: (prev[postId] || 0) + 1
      }));
      
      toast.success('Comment added successfully!');
    } catch (error) {
      toast.error('Failed to add comment.');
      console.error('Error adding comment:', error);
    }
  };

  const deleteComment = (postId, commentIndex) => {
    try {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId && post.comments) {
            const newComments = [...post.comments];
            newComments.splice(commentIndex, 1);
            return {
              ...post,
              comments: newComments
            };
          }
          return post;
        })
      );
      
      setCommentCount(prev => ({
        ...prev,
        [postId]: Math.max((prev[postId] || 0) - 1, 0)
      }));
      
      toast.success('Comment deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete comment.');
      console.error('Error deleting comment:', error);
    }
  };

  const openPostModal = (post) => {
    setSelectedPost(post);
  };

  const closePostModal = () => {
    setSelectedPost(null);
  };

  const openCommentModal = (post) => {
    setSelectedPostForComment(post);
  };

  const closeCommentModal = () => {
    setSelectedPostForComment(null);
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = posts.filter(post => 
      (post.title && post.title.toLowerCase().includes(term)) ||
      (post.description && post.description.toLowerCase().includes(term)) ||
      (post.location && post.location.toLowerCase().includes(term)) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(term)))
    );
    
    setSearchResults(filtered);
    setIsSearching(true);
    
    if (filtered.length === 0) {
      toast.info(`No results found for "${searchTerm}"`);
    } else {
      toast.success(`Found ${filtered.length} results for "${searchTerm}"`);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (!e.target.value) {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
    setSearchResults([]);
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId'); 

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
        } else {
          toast.error('Failed to fetch user profile.');
        }
      } catch (error) {
        toast.error('An error occurred while fetching the user profile.');
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/posts');
        if (response.ok) {
          const data = await response.json();
          
          const transformedPosts = data.map(post => ({
            ...post,
            imageUrl: post.photoUrls && post.photoUrls.length > 0
              ? `http://localhost:8080/uploads/posts/${post.photoUrls[0]}`
              : '/assets/placeholder-image.png',
          }));

          setPosts(transformedPosts);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchPosts();
  }, []);

  useEffect(() => {
    const counts = {};
    posts.forEach(post => {
      if (post.comments) {
        counts[post.id] = post.comments.length;
      }
    });
    setCommentCount(counts);
  }, [posts]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    window.location.href = '/travelshare/login';
  };

  const PostCard = ({ post }) => {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const mediaItems = [...(post.photoUrls || []), ...(post.videoUrls || [])].filter(Boolean);

    const handleNext = (e) => {
      e.stopPropagation();
      setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
    };

    const handlePrev = (e) => {
      e.stopPropagation();
      setCurrentMediaIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length);
    };

    const goToMedia = (index) => (e) => {
      e.stopPropagation();
      setCurrentMediaIndex(index);
    };

    return (
      <div style={postStyles.postContainer}>
        <div style={postStyles.postHeader}>
          <div style={postStyles.userAvatar}>
            {getInitials(user.name)}
          </div>
          <div style={postStyles.postUserInfo}>
            <p style={postStyles.postUserName}>{user.name || 'Travel Enthusiast'}</p>
            <p style={postStyles.postTime}>{formatDate(post.createdAt)}</p>
          </div>
        </div>
        
        {mediaItems.length > 0 && (
          <div 
            style={postStyles.mediaContainer}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {mediaItems[currentMediaIndex].endsWith('.mp4') ? (
              <video
                src={`http://localhost:8080/uploads/posts/${mediaItems[currentMediaIndex]}`}
                controls
                style={postStyles.mediaVideo}
              />
            ) : (
              <img
                src={`http://localhost:8080/uploads/posts/${mediaItems[currentMediaIndex]}`}
                alt={`Uploaded content ${currentMediaIndex + 1}`}
                style={postStyles.mediaImage}
              />
            )}
            
            {mediaItems.length > 1 && (
              <>
                <button
                  style={{
                    ...postStyles.navButton,
                    ...postStyles.navButtonLeft,
                    opacity: isHovering ? 0.8 : 0,
                  }}
                  onClick={handlePrev}
                >
                  &#8249;
                </button>
                <button
                  style={{
                    ...postStyles.navButton, 
                    ...postStyles.navButtonRight,
                    opacity: isHovering ? 0.8 : 0,
                  }}
                  onClick={handleNext}
                >
                  &#8250;
                </button>
                <div style={postStyles.dotsContainer}>
                  {mediaItems.map((_, index) => (
                    <div
                      key={index}
                      onClick={goToMedia(index)}
                      style={{
                        ...postStyles.dot,
                        ...(index === currentMediaIndex ? postStyles.activeDot : {}),
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div style={postStyles.postContent}>
          <h3 style={postStyles.postTitle}>{post.title}</h3>
          <p style={postStyles.postText}>{post.description}</p>
          {post.tags && post.tags.length > 0 && (
            <div style={postStyles.postTags}>
              {post.tags.map((tag, index) => (
                <span key={index} style={postStyles.tag}>#{tag}</span>
              ))}
            </div>
          )}
        </div>
        
        <div style={postStyles.postActions}>
          <div
            style={{
              ...postStyles.postAction,
              color: likedPosts[post.id] ? 'red' : '#fff',
            }}
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(post.id);
            }}
          >
            <FaHeart
              style={{
                ...postStyles.postActionIcon,
                color: likedPosts[post.id] ? 'red' : '#fff', // Ensure heart icon color changes
              }}
            />
            Like
          </div>
          <div
            style={postStyles.postAction}
            onClick={(e) => {
              e.stopPropagation();
              openCommentModal(post);
            }}
          >
            <FaComment style={postStyles.postActionIcon} />
            Comment ({commentCount[post.id] || 0})
          </div>
          <div style={postStyles.postAction}>
            <FaShare style={postStyles.postActionIcon} />
            Share
          </div>
        </div>
        
        {post.comments && post.comments.length > 0 && (
          <div style={{...postStyles.commentSection, maxHeight: '100px', overflowY: 'hidden'}}>
            {post.comments.slice(0, 2).map((comment, index) => (
              <div key={index} style={{
                padding: '8px',
                borderRadius: '8px',
                backgroundColor: '#f0f2f5',
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                <span style={{fontWeight: 'bold'}}>User: </span>
                {comment}
              </div>
            ))}
            {post.comments.length > 2 && (
              <div style={{
                cursor: 'pointer',
                color: '#65676b',
                fontSize: '14px',
                padding: '4px'
              }} onClick={() => openCommentModal(post)}>
                View all {post.comments.length} comments
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  if (!user) {
    return (
      <div style={styles.dashboardContainer}>
        <UserNav />
        <div style={styles.mainContent}>
          <h1 style={styles.welcomeMessage}>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <UserNav />
      <div style={styles.dashboardContainer}>
        {/* Background Video */}
        <video autoPlay loop muted playsInline style={styles.bgVideo}>
          <source src="/assets/Travel1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div style={styles.videoOverlay}></div> {/* Overlay for better readability */}

        <div style={sidebarOpen ? styles.sidebar : { ...styles.sidebar, ...styles.sidebarCollapsed }}>
          <div
            style={styles.toggleIcon}
            onClick={() => setSidebarOpen((open) => !open)}
            title={sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
            onMouseEnter={(e) => (e.target.style.color = styles.toggleIconHover.color)}
            onMouseLeave={(e) => (e.target.style.color = styles.toggleIcon.color)}
          >
            {sidebarOpen ? <FaArrowLeft /> : <FaBars />}
          </div>
          <div style={{ ...styles.userBox, opacity: sidebarOpen ? 1 : 0, height: sidebarOpen ? 'auto' : 0, overflow: 'hidden' }}>
            {user.username}
          </div>
          <ul style={styles.navLinks}>
            <li>
              <a
                href="/travelshare/dashboard"
                style={sidebarOpen ? styles.navLink : { ...styles.navLink, ...styles.navLinkCollapsed }}
                title="Dashboard"
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.navLinkHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                {sidebarOpen ? 'Dashboard' : '🏠'}
              </a>
            </li>
            <li>
              <a
                href="/travelshare/diaries"
                style={sidebarOpen ? styles.navLink : { ...styles.navLink, ...styles.navLinkCollapsed }}
                title="Travel Diaries"
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.navLinkHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                {sidebarOpen ? 'Travel Diaries' : '📖'}
              </a>
            </li>
            <li>
              <a
                href="/travelshare/planning"
                style={sidebarOpen ? styles.navLink : { ...styles.navLink, ...styles.navLinkCollapsed }}
                title="Trip Planning"
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.navLinkHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                {sidebarOpen ? 'Trip Planning' : '🗺️'}
              </a>
            </li>
            <li>
              <a
                href="/travelshare/guides" // Changed from "/travelshare/guides/1/dashboard" to "/travelshare/guides"
                style={sidebarOpen ? styles.navLink : { ...styles.navLink, ...styles.navLinkCollapsed }}
                title="Destination Guides"
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.navLinkHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                {sidebarOpen ? 'Destination Guides' : '📍'}
              </a>
            </li>
            <li>
              <a
                href="/travelshare/events"
                style={sidebarOpen ? styles.navLink : { ...styles.navLink, ...styles.navLinkCollapsed }}
                title="Event Management"
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.navLinkHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                {sidebarOpen ? 'Event Management' : '📅'}
              </a>
            </li>
          </ul>

          {sidebarOpen && (
            <button 
              style={styles.logoutButton} 
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>

        <div style={{...styles.mainContent, marginLeft: sidebarOpen ? '250px' : '60px'}}>
          <p style={styles.welcomeMessage}>Hello, <span style={styles.userName}>{user.name}</span>! We're glad to have you here.</p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search for destinations, posts, tags..."
              value={searchTerm}
              onChange={handleSearchInputChange}
              style={{
                ...styles.searchInput,
                ...(isSearchInputFocused ? styles.searchInputFocus : {})
              }}
              onFocus={() => setIsSearchInputFocused(true)}
              onBlur={() => setIsSearchInputFocused(false)}
            />
            {searchTerm && (
              <button 
                type="button" 
                onClick={clearSearch}
                style={styles.clearButton}
                title="Clear search"
              >
                <FaTimes />
              </button>
            )}
            <button 
              type="submit" 
              style={styles.searchButton}
              title="Search"
              onMouseEnter={(e) => Object.assign(e.target.style, styles.searchButtonHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, { backgroundColor: 'transparent' })}
            >
              <FaSearch />
            </button>
          </form>
          
          {isSearching && (
            <div style={styles.searchResults}>
              {searchResults.length > 0 ? (
                <p>Showing {searchResults.length} results for "{searchTerm}"</p>
              ) : (
                <div style={styles.noResults}>
                  <p>No results found for "{searchTerm}"</p>
                  <p style={{fontSize: '14px', marginTop: '5px'}}>Try different keywords or check your spelling</p>
                </div>
              )}
            </div>
          )}
          
          {loading ? (
            <div>Loading posts...</div>
          ) : isSearching ? (
            searchResults.length === 0 ? (
              <div style={{width: '100%', textAlign: 'center'}}>
                <button 
                  onClick={clearSearch}
                  style={{
                    padding: '10px 20px',
                    background: '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Show all posts
                </button>
              </div>
            ) : (
              <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {searchResults.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )
          ) : posts.length === 0 ? (
            <div>No posts yet. Be the first to share your travel story!</div>
          ) : (
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {selectedPost && (
        <PostModal post={selectedPost} onClose={closePostModal} />
      )}
      
      {selectedPostForComment && (
        <CommentModal 
          post={selectedPostForComment} 
          onClose={closeCommentModal} 
          onAddComment={addComment}
          onDeleteComment={deleteComment}
        />
      )}
    </>
  );
};

export default Dashboard;
