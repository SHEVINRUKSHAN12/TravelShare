import React from 'react';

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
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  mediaVideo: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
};

function PostModal({ post, onClose }) {
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
        <div style={styles.mediaContainer}>
          {post.photoUrls.map((photo, index) => (
            <div key={index} style={styles.mediaItem}>
              <img
                src={`http://localhost:8080/uploads/posts/${photo}`}
                alt={`Uploaded content ${index + 1}`}
                style={styles.mediaImage}
              />
            </div>
          ))}
          {post.videoUrls.map((video, index) => (
            <div key={index} style={styles.mediaItem}>
              <video
                src={`http://localhost:8080/uploads/posts/${video}`}
                controls
                style={styles.mediaVideo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostModal;
