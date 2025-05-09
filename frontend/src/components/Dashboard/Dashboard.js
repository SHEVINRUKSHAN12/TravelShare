import React, { useEffect, useState } from 'react';
import UserNav from '../Navbar/UserNav'; 
import { toast } from 'react-toastify';
import { FaBars, FaArrowLeft, FaComment, FaHeart, FaShare } from 'react-icons/fa';
import PostModal from '../TravelDiaries/PostModal';
import CommentModal from './CommentModal';
import { format } from 'date-fns';

const styles = {
  dashboardContainer: {
    display: 'flex',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    paddingTop: '80px',
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
    flex: 1,
    padding: '20px',
    marginLeft: '250px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  welcomeMessage: {
    fontSize: '1.5rem',
    color: '#555',
    textAlign: 'center',
    marginBottom: '20px',
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
  }
};

const postStyles = {
  postContainer: {
    width: '100%',
    maxWidth: '700px', 
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderBottom: '1px solid #f0f2f5',
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
  },
  postUserName: {
    fontWeight: 'bold',
    fontSize: '15px',
    marginBottom: '2px',
  },
  postTime: {
    fontSize: '12px',
    color: '#65676b',
  },
  postContent: {
    padding: '12px',
  },
  postTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  postText: {
    fontSize: '15px',
    marginBottom: '12px',
    color: '#333',
  },
  postImage: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '0 0 8px 8px',
    cursor: 'pointer',
  },
  postActions: {
    display: 'flex',
    borderTop: '1px solid #f0f2f5',
    padding: '8px',
  },
  postAction: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px',
    cursor: 'pointer',
    borderRadius: '4px',
    color: '#65676b',
    fontSize: '14px',
  },
  postActionIcon: {
    marginRight: '6px',
  },
  postTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    marginTop: '8px',
    marginBottom: '12px',
  },
  tag: {
    backgroundColor: '#e9f5fe',
    color: '#1877f2',
    padding: '4px 8px',
    borderRadius: '16px',
    fontSize: '13px',
  },
  commentSection: {
    marginTop: '8px',
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
              : null
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
                href="/travelshare/guides"
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
          <p style={styles.welcomeMessage}>Hello, <span style={{ color: '#27ae60', fontWeight: 'bold' }}>{user.name}</span>! We're glad to have you here.</p>
          
          {loading ? (
            <div>Loading posts...</div>
          ) : posts.length === 0 ? (
            <div>No posts yet. Be the first to share your travel story!</div>
          ) : (
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              {posts.map((post) => (
                <div key={post.id} style={postStyles.postContainer}>
                  <div style={postStyles.postHeader}>
                    <div style={postStyles.userAvatar}>
                      {getInitials(user.name)}
                    </div>
                    <div style={postStyles.postUserInfo}>
                      <p style={postStyles.postUserName}>{user.name || 'Travel Enthusiast'}</p>
                      <p style={postStyles.postTime}>{formatDate(post.createdAt)}</p>
                    </div>
                  </div>
                  
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
                  
                  {post.imageUrl && (
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      style={postStyles.postImage}
                      onClick={() => openPostModal(post)} 
                    />
                  )}
                  
                  <div style={postStyles.postActions}>
                    <div
                      style={{
                        ...postStyles.postAction,
                        color: likedPosts[post.id] ? 'red' : '#65676b',
                      }}
                      onClick={() => toggleLike(post.id)}
                    >
                      <FaHeart style={postStyles.postActionIcon} />
                      Like
                    </div>
                    <div 
                      style={postStyles.postAction}
                      onClick={() => openCommentModal(post)}
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
