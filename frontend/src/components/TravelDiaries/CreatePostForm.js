import React, { useState, useEffect } from 'react'; // Added useEffect import
import UserNav from '../Navbar/UserNav'; // Changed import from Navbar to UserNav
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker overlay for readability
    zIndex: -1,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)', // Slightly transparent white
    padding: '2.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', // Stronger shadow
    maxWidth: '700px',
    width: '90%',
    marginTop: '2rem',
    zIndex: 10, // Higher z-index to ensure visibility
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
    marginTop: '1.5rem',
    transition: 'background-color 0.2s',
  },
  filePreviewContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px',
  },
  filePreview: {
    position: 'relative',
    width: '100px',
    height: '100px',
    borderRadius: '5px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  filePreviewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
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

  // Add an effect to check if component mounts properly
  useEffect(() => {
    console.log("CreatePostForm mounted");
    document.body.style.backgroundColor = "#f0f0f0"; // Fallback background
    
    // Cleanup function
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handlePhotoChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024); // Max 10MB per photo
    if (validFiles.length !== files.length) {
      toast.warn('Some files were too large and were not added.');
    }
    setPhotos([...photos, ...validFiles]);
  };

  const handleVideoChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => file.size <= 50 * 1024 * 1024); // Max 50MB per video
    if (validFiles.length !== files.length) {
      toast.warn('Some files were too large and were not added.');
    }
    setVideos([...videos, ...validFiles]);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const removeVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('tags', tags);

      // Add userId to form data
      const userId = localStorage.getItem('userId');
      formData.append('userId', userId);
      console.log('Creating post with userId:', userId); // Debug log

      // Add photos and videos
      if (photos.length > 0) {
        photos.forEach(photo => {
          formData.append('photos', photo);
        });
      }

      if (videos.length > 0) {
        videos.forEach(video => {
          formData.append('videos', video);
        });
      }

      const response = await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        toast.success('Post created successfully!');
        navigate('/diaries');
      } else {
        toast.error('Failed to create post.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('An error occurred while creating the post.');
    } finally {
      setIsSubmitting(false);
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

      <UserNav /> {/* Changed from Navbar to UserNav */}
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
              accept="image/jpeg, image/png, image/gif, image/webp" // Added more image types
              onChange={handlePhotoChange}
              style={styles.fileInputHidden}
            />
            <div style={styles.filePreviewContainer}>
              {photos.map((photo, index) => (
                <div key={index} style={styles.filePreview}>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Preview"
                    style={styles.filePreviewImage}
                  />
                  <button
                    type="button"
                    style={styles.removeButton}
                    onClick={() => removePhoto(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <p style={styles.fileInfo}>Max 10MB per photo. Supported: .jpg, .png, .gif, .webp</p>
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
              accept="video/mp4, video/webm, video/ogg" // Added more video types
              onChange={handleVideoChange}
              style={styles.fileInputHidden}
            />
            <div style={styles.filePreviewContainer}>
              {videos.map((video, index) => (
                <div key={index} style={styles.filePreview}>
                  <video
                    src={URL.createObjectURL(video)}
                    style={styles.filePreviewImage}
                    controls
                  />
                  <button
                    type="button"
                    style={styles.removeButton}
                    onClick={() => removeVideo(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <p style={styles.fileInfo}>Max 50MB per video. Supported: .mp4, .webm, .ogg</p>
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
