import React, { useState } from 'react';
import { toast } from 'react-toastify';

const styles = {
  formContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  formContent: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    width: '90%',
    maxWidth: '700px',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
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
  formTitle: {
    textAlign: 'center',
    color: '#27ae60',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    minHeight: '100px',
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#95a5a6',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

function EditPostForm({ post, onClose, onUpdate }) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [tags, setTags] = useState(post.tags ? post.tags.join(',') : '');
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState(post.photoUrls || []);
  const [existingVideos, setExistingVideos] = useState(post.videoUrls || []);
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (event) => {
    const files = Array.from(event.target.files);
    setPhotos([...photos, ...files]);
  };

  const handleVideoChange = (event) => {
    const files = Array.from(event.target.files);
    setVideos([...videos, ...files]);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const removeVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const removeExistingPhoto = (index) => {
    setExistingPhotos(existingPhotos.filter((_, i) => i !== index));
  };

  const removeExistingVideo = (index) => {
    setExistingVideos(existingVideos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('tags', tags);

      // Add new photos and videos
      photos.forEach((photo) => formData.append('photos', photo));
      videos.forEach((video) => formData.append('videos', video));

      // Add remaining existing photos and videos
      formData.append('existingPhotos', JSON.stringify(existingPhotos));
      formData.append('existingVideos', JSON.stringify(existingVideos));

      const response = await fetch(`http://localhost:8080/api/posts/${post.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const updatedPost = await response.json();
        toast.success('Post updated successfully!');
        onUpdate(updatedPost);
        onClose();
      } else {
        toast.error('Failed to update post.');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('An error occurred while updating the post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.formContainer}>
      <div style={styles.formContent}>
        <button style={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 style={styles.formTitle}>Edit Travel Diary</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={styles.textarea}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Tags (comma separated):</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="nature,adventure,beach"
              style={styles.input}
            />
          </div>

          {/* Existing Photos */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Existing Photos:</label>
            <div style={styles.filePreviewContainer}>
              {existingPhotos.map((photo, index) => (
                <div key={index} style={styles.filePreview}>
                  <img
                    src={`http://localhost:8080/uploads/posts/${photo}`}
                    alt="Existing Photo"
                    style={styles.filePreviewImage}
                  />
                  <button
                    type="button"
                    style={styles.removeButton}
                    onClick={() => removeExistingPhoto(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Existing Videos */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Existing Videos:</label>
            <div style={styles.filePreviewContainer}>
              {existingVideos.map((video, index) => (
                <div key={index} style={styles.filePreview}>
                  <video
                    src={`http://localhost:8080/uploads/posts/${video}`}
                    controls
                    style={styles.filePreviewImage}
                  />
                  <button
                    type="button"
                    style={styles.removeButton}
                    onClick={() => removeExistingVideo(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* New Photos */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Upload New Photos:</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoChange}
              style={styles.input}
            />
            <div style={styles.filePreviewContainer}>
              {photos.map((photo, index) => (
                <div key={index} style={styles.filePreview}>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="New Photo"
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
          </div>

          {/* New Videos */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Upload New Videos:</label>
            <input
              type="file"
              multiple
              accept="video/*"
              onChange={handleVideoChange}
              style={styles.input}
            />
            <div style={styles.filePreviewContainer}>
              {videos.map((video, index) => (
                <div key={index} style={styles.filePreview}>
                  <video
                    src={URL.createObjectURL(video)}
                    controls
                    style={styles.filePreviewImage}
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
          </div>

          <div style={styles.buttonContainer}>
            <button
              type="button"
              onClick={onClose}
              style={styles.cancelButton}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={styles.saveButton}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPostForm;
