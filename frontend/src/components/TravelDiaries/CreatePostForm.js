import React, { useState } from 'react';
import Navbar from '../Navbar/nav';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { toast } from 'react-toastify'; // Import toast

// Updated Inline Styles
const styles = {
  pageContainer: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '80px', // Avoid overlap with fixed navbar
    paddingBottom: '2rem',
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
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)', // Slightly transparent white
    padding: '2.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
    maxWidth: '700px',
    width: '90%',
    marginTop: '2rem',
    zIndex: 1, // Ensure it's above the video
  },
  header: {
    textAlign: 'center',
    color: '#222',
    marginBottom: '2rem',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#333', // Darker text for better readability
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
    minHeight: '120px',
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  fileInput: {
    display: 'block',
    marginTop: '0.5rem',
  },
  fileInputLabel: {
    display: 'inline-block',
    padding: '0.6rem 1rem',
    backgroundColor: '#e9ecef',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    color: '#495057',
  },
  fileInputHidden: {
    display: 'none',
  },
  fileInfo: {
    fontSize: '0.8rem',
    color: '#555', // Slightly darker for better contrast
    marginTop: '0.5rem',
  },
  submitButton: {
    display: 'block',
    width: '100%',
    padding: '0.9rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1.5rem',
    transition: 'background-color 0.2s',
  }
};

function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to disable button during submission
  const navigate = useNavigate(); // Hook for navigation

  // Path to video file
  const videoPath = "/assets/Travel1.mp4"; // Same path as used in the home page

  const handlePhotoChange = (event) => {
    setPhotos(event.target.files);
  };

  const handleVideoChange = (event) => {
    setVideos(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.warn('Title and Description cannot be empty.'); // Use toast for validation error
      return;
    }
    if (isSubmitting) return; // Prevent double submission

    setIsSubmitting(true); // Disable button

    const uploadedPhotoUrls = []; // Replace with actual URLs after upload
    const uploadedVideoUrls = []; // Replace with actual URLs after upload

    const postData = {
      title: title.trim(),
      description: description.trim(),
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      photoUrls: uploadedPhotoUrls,
      videoUrls: uploadedVideoUrls,
      authorId: 'temp-user-id', // Placeholder
      authorName: 'Temporary User' // Placeholder
    };

    try {
      const response = await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const createdPost = await response.json();
      console.log('Post created successfully:', createdPost);
      toast.success('Post created successfully!'); // Use toast for success message
      navigate('/diaries');

    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(`Failed to create post: ${error.message}`); // Use toast for submission error
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Background Video */}
      <video autoPlay loop muted playsInline style={styles.bgVideo}>
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={styles.videoOverlay}></div> {/* Overlay for better readability */}

      <Navbar />
      <div style={styles.formContainer}>
        <h1 style={styles.header}>Create New Travel Post</h1>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div style={styles.formGroup}>
            <label htmlFor="title" style={styles.label}>Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* Description */}
          <div style={styles.formGroup}>
            <label htmlFor="description" style={styles.label}>Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={styles.textarea}
              required
            />
          </div>

          {/* Tags */}
          <div style={styles.formGroup}>
            <label htmlFor="tags" style={styles.label}>Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              style={styles.input}
              placeholder="e.g., #Beach, #Adventure, #Food"
            />
          </div>

          {/* Photo Upload */}
          <div style={styles.formGroup}>
            <label htmlFor="photos" style={styles.label}>Upload Photos (up to 5)</label>
            <label htmlFor="photo-upload" style={styles.fileInputLabel}>
              Choose Files...
            </label>
            <input
              type="file"
              id="photo-upload"
              multiple
              accept="image/jpeg, image/png"
              onChange={handlePhotoChange}
              style={styles.fileInputHidden}
            />
            {photos.length > 0 && (
              <span style={styles.fileInfo}>{photos.length} photo(s) selected</span>
            )}
            <p style={styles.fileInfo}>Max 10MB per photo. Supported: .jpg, .png</p>
          </div>

          {/* Video Upload */}
          <div style={styles.formGroup}>
            <label htmlFor="videos" style={styles.label}>Upload Videos (up to 3, max 30s each)</label>
            <label htmlFor="video-upload" style={styles.fileInputLabel}>
              Choose Files...
            </label>
            <input
              type="file"
              id="video-upload"
              multiple
              accept="video/mp4"
              onChange={handleVideoChange}
              style={styles.fileInputHidden}
            />
            {videos.length > 0 && (
              <span style={styles.fileInfo}>{videos.length} video(s) selected</span>
            )}
            <p style={styles.fileInfo}>Max 50MB per video. Supported: .mp4</p>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            style={{
              ...styles.submitButton,
              backgroundColor: isSubmitting ? '#0056b3' : '#007bff',
            }} 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostForm;
