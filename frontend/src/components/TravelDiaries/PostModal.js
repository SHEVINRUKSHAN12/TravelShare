import React, { useState } from 'react';

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '800px',
    width: '90%',
    maxHeight: '90%',
    overflowY: 'auto',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '20px',
  },
  mediaItem: {
    width: '100%',
    maxWidth: '300px',
    borderRadius: '5px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  mediaImage: {
    width: 'auto', // Allow the image to take its natural width
    height: 'auto', // Allow the image to take its natural height
    maxWidth: '100%', // Ensure it doesn't overflow the modal
    maxHeight: '400px', // Limit the height to prevent overflow
  },
  mediaVideo: {
    width: 'auto', // Allow the video to take its natural width
    height: 'auto', // Allow the video to take its natural height
    maxWidth: '100%', // Ensure it doesn't overflow the modal
    maxHeight: '400px', // Limit the height to prevent overflow
  },
  navButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
  },
  navButtonLeft: {
    left: '10px',
  },
  navButtonRight: {
    right: '10px',
  },
};

function PostModal({ post, onClose, onEdit, onDelete, userId }) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const mediaItems = [...post.photoUrls, ...post.videoUrls];

  const handleNext = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
  };

  const handlePrev = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length);
  };

  // Check if current user is the post owner
  const isPostOwner = post.userId === userId;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button style={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <p>
          <strong>Tags:</strong> {post.tags.map(tag => `#${tag} `).join(' ')}
        </p>
        <div style={{ position: 'relative' }}>
          <button
            style={{ ...styles.navButton, ...styles.navButtonLeft }}
            onClick={handlePrev}
          >
            &#8249;
          </button>
          {mediaItems[currentMediaIndex].endsWith('.mp4') ? (
            <video
              src={`http://localhost:8080/uploads/posts/${mediaItems[currentMediaIndex]}`}
              controls
              style={styles.mediaVideo}
            />
          ) : (
            <img
              src={`http://localhost:8080/uploads/posts/${mediaItems[currentMediaIndex]}`}
              alt={`Uploaded content ${currentMediaIndex + 1}`}
              style={styles.mediaImage}
            />
          )}
          <button
            style={{ ...styles.navButton, ...styles.navButtonRight }}
            onClick={handleNext}
          >
            &#8250;
          </button>
        </div>
        
        {/* Add edit and delete buttons if user is the post owner */}
        {isPostOwner && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '15px',
            gap: '10px'
          }}>
            <button 
              onClick={() => onEdit(post)}
              style={{
                padding: '8px 15px',
                backgroundColor: '#3498db',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Edit
            </button>
            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this post?')) {
                  onDelete(post.id);
                }
              }}
              style={{
                padding: '8px 15px',
                backgroundColor: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostModal;
