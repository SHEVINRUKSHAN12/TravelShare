import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/events';

// Toast notification component
const Toast = ({ message, type, onClose }) => {
  const toastStyles = {
    container: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      maxWidth: '350px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
      color: 'white',
      fontSize: '16px',
      animation: 'slideIn 0.3s ease-out forwards',
    },
    message: {
      flex: 1,
    },
    close: {
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '20px',
      cursor: 'pointer',
      marginLeft: '10px',
    }
  };

  return (
    <div style={toastStyles.container}>
      <div style={toastStyles.message}>{message}</div>
      <button style={toastStyles.close} onClick={onClose}>×</button>
    </div>
  );
};

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    meetingPoint: '',
    category: '',
    maxAttendees: '',
    organizer: '',
    contactEmail: '',
    contactPhone: '',
    difficulty: '',
    duration: '',
    whatToBring: [],
    image: null,
    previewUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    // Auto-close after 5 seconds
    setTimeout(() => {
      setToast({ visible: false, message: '', type: 'success' });
    }, 5000);
  };

  const closeToast = () => {
    setToast({ visible: false, message: '', type: 'success' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleWhatToBringChange = (e) => {
    const itemsList = e.target.value.split('\n').filter(item => item.trim() !== '');
    setFormData({
      ...formData,
      whatToBring: itemsList
    });
    
    // Clear error if exists
    if (errors.whatToBring) {
      setErrors({
        ...errors,
        whatToBring: null
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        previewUrl: URL.createObjectURL(file)
      });

      // Clear error for image field
      if (errors.image) {
        setErrors({
          ...errors,
          image: null
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title should be at least 5 characters long';
      isValid = false;
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'Title should not exceed 100 characters';
      isValid = false;
    }
    
    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description should be at least 20 characters long';
      isValid = false;
    } else if (formData.description.trim().length > 2000) {
      newErrors.description = 'Description should not exceed 2000 characters';
      isValid = false;
    }
    
    // Date validation
    if (!formData.date) {
      newErrors.date = 'Date is required';
      isValid = false;
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Event date cannot be in the past';
        isValid = false;
      }
    }
    
    // Time validation
    if (!formData.time) {
      newErrors.time = 'Time is required';
      isValid = false;
    }
    
    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
      isValid = false;
    } else if (formData.location.trim().length < 3) {
      newErrors.location = 'Please enter a valid location';
      isValid = false;
    } else if (formData.location.trim().length > 200) {
      newErrors.location = 'Location should not exceed 200 characters';
      isValid = false;
    }
    
    // Meeting point validation (optional)
    if (formData.meetingPoint && formData.meetingPoint.trim().length > 0) {
      if (formData.meetingPoint.trim().length < 5) {
        newErrors.meetingPoint = 'Meeting point should be at least 5 characters';
        isValid = false;
      } else if (formData.meetingPoint.trim().length > 200) {
        newErrors.meetingPoint = 'Meeting point should not exceed 200 characters';
        isValid = false;
      }
    }
    
    // Category validation
    if (!formData.category) {
      newErrors.category = 'Please select a category';
      isValid = false;
    }
    
    // Difficulty validation (optional)
    if (formData.difficulty && !['easy', 'moderate', 'challenging', 'extreme'].includes(formData.difficulty)) {
      newErrors.difficulty = 'Please select a valid difficulty level';
      isValid = false;
    }
    
    // Duration validation (optional)
    if (formData.duration) {
      if (isNaN(formData.duration) || parseFloat(formData.duration) <= 0) {
        newErrors.duration = 'Duration must be a positive number';
        isValid = false;
      } else if (parseFloat(formData.duration) > 168) { // 7 days in hours
        newErrors.duration = 'Duration cannot exceed 168 hours (7 days)';
        isValid = false;
      }
    }
    
    // Organizer validation
    if (!formData.organizer.trim()) {
      newErrors.organizer = 'Organizer name is required';
      isValid = false;
    } else if (formData.organizer.trim().length < 2) {
      newErrors.organizer = 'Organizer name is too short';
      isValid = false;
    } else if (formData.organizer.trim().length > 100) {
      newErrors.organizer = 'Organizer name should not exceed 100 characters';
      isValid = false;
    }
    
    // Email validation
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail.trim())) {
      newErrors.contactEmail = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Phone validation (optional field)
    if (formData.contactPhone && !/^\+?[\d\s-]{10,15}$/.test(formData.contactPhone.trim())) {
      newErrors.contactPhone = 'Please enter a valid phone number';
      isValid = false;
    }

    // Max attendees validation
    if (formData.maxAttendees) {
      if (isNaN(formData.maxAttendees) || parseInt(formData.maxAttendees) <= 0) {
        newErrors.maxAttendees = 'Please enter a positive number';
        isValid = false;
      } else if (parseInt(formData.maxAttendees) > 1000) {
        newErrors.maxAttendees = 'Maximum attendees cannot exceed 1000';
        isValid = false;
      }
    }
    
    // What to bring validation
    if (formData.whatToBring && formData.whatToBring.length > 0) {
      // Check if any item is too long
      const longItems = formData.whatToBring.filter(item => item.length > 100);
      if (longItems.length > 0) {
        newErrors.whatToBring = 'Each item should be less than 100 characters';
        isValid = false;
      }
      
      // Check if there are too many items
      if (formData.whatToBring.length > 20) {
        newErrors.whatToBring = 'Please limit the list to 20 items';
        isValid = false;
      }
    }

    // Image validation
    if (!formData.image) {
      newErrors.image = 'Event image is required';
      isValid = false;
    } else {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (formData.image.size > maxSize) {
        newErrors.image = 'Image size should not exceed 5MB';
        isValid = false;
      }
      
      const acceptedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!acceptedFormats.includes(formData.image.type)) {
        newErrors.image = 'Only JPEG, PNG and WebP formats are accepted';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Please fix the validation errors before submitting.', 'error');
      
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      document.getElementsByName(firstErrorField)[0]?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert date string to ISO format
      const eventData = {
        ...formData,
        date: formData.date,  // Spring will parse this correctly
        maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : 0
      };

      // For file upload - we'd normally use FormData
      // For this implementation, we'll use a direct URL for simplicity
      // In a real app, you would use FormData and handle file upload properly
      if (formData.previewUrl) {
        eventData.imageUrl = formData.previewUrl;
      }
      
      delete eventData.image;
      delete eventData.previewUrl;
      
      const response = await axios.post(API_URL, eventData);
      console.log('Event created:', response.data);
      
      showToast('Event created successfully!', 'success');
      
      // Redirect after a short delay to allow the user to see the success message
      setTimeout(() => {
        navigate('/events');
      }, 2000);
    } catch (error) {
      console.error('Error creating event:', error);
      
      if (error.response && error.response.data && error.response.data.message) {
        showToast(error.response.data.message, 'error');
      } else {
        showToast('Failed to create event. Please try again.', 'error');
      }
      
      setIsSubmitting(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    header: {
      marginBottom: '30px',
    },
    heading: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '10px',
    },
    subtitle: {
      color: '#64748b',
      fontSize: '16px',
    },
    form: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    formGroup: {
      marginBottom: '25px',
    },
    formRow: {
      display: 'flex',
      gap: '20px',
      marginBottom: '25px',
    },
    formCol: {
      flex: 1,
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#334155',
    },
    input: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      borderRadius: '6px',
      border: '1px solid #cbd5e1',
      transition: 'border 0.2s ease',
    },
    inputFocus: {
      borderColor: '#3b82f6',
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)',
    },
    select: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      borderRadius: '6px',
      border: '1px solid #cbd5e1',
      backgroundColor: 'white',
    },
    textarea: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      borderRadius: '6px',
      border: '1px solid #cbd5e1',
      minHeight: '150px',
      resize: 'vertical',
    },
    error: {
      color: '#ef4444',
      fontSize: '14px',
      marginTop: '5px',
    },
    imageUpload: {
      marginTop: '10px',
    },
    imagePreviewContainer: {
      marginTop: '15px',
      width: '100%',
      height: '200px',
      border: '1px dashed #cbd5e1',
      borderRadius: '6px',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8fafc',
    },
    imagePreview: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
    },
    uploadPlaceholder: {
      color: '#94a3b8',
      textAlign: 'center',
    },
    uploadIcon: {
      fontSize: '40px',
      marginBottom: '10px',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '30px',
    },
    cancelButton: {
      padding: '12px 20px',
      backgroundColor: '#f1f5f9',
      color: '#334155',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center',
    },
    submitButton: {
      padding: '12px 30px',
      backgroundColor: '#4ade80',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '150px',
    },
    disabledButton: {
      opacity: 0.7,
      cursor: 'not-allowed',
    },
    buttonIcon: {
      marginRight: '8px',
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      borderTop: '2px solid white',
      animation: 'spin 1s linear infinite',
      marginRight: '10px',
    },
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
    section: {
      marginBottom: '30px',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '15px',
      paddingBottom: '8px',
      borderBottom: '1px solid #e2e8f0',
    },
  };

  return (
    <div style={styles.container}>
      {toast.visible && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={closeToast}
        />
      )}
      
      <div style={styles.header}>
        <h1 style={styles.heading}>Create New Event</h1>
        <p style={styles.subtitle}>Share your travel meetups, workshops, or activities with the community</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Basic Information</h2>
          
          <div style={styles.formGroup}>
            <label htmlFor="title" style={styles.label}>
              Event Title <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter a descriptive title for your event"
              value={formData.title}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.title ? { borderColor: '#ef4444' } : {})
              }}
            />
            {errors.title && <div style={styles.error}>{errors.title}</div>}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="description" style={styles.label}>
              Event Description <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your event, activities, what to expect, etc."
              value={formData.description}
              onChange={handleChange}
              style={{
                ...styles.textarea,
                ...(errors.description ? { borderColor: '#ef4444' } : {})
              }}
            />
            {errors.description && <div style={styles.error}>{errors.description}</div>}
          </div>

          <div style={styles.formRow}>
            <div style={styles.formCol}>
              <label htmlFor="category" style={styles.label}>
                Category <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  ...styles.select,
                  ...(errors.category ? { borderColor: '#ef4444' } : {})
                }}
              >
                <option value="">Select a category</option>
                <option value="hiking">Hiking</option>
                <option value="water sports">Water Sports</option>
                <option value="roadtrip">Road Trip</option>
                <option value="food">Food & Cuisine</option>
                <option value="cultural">Cultural Experience</option>
                <option value="photography">Photography</option>
                <option value="wildlife">Wildlife & Nature</option>
                <option value="adventure">Adventure & Extreme</option>
                <option value="wellness">Wellness & Retreat</option>
                <option value="other">Other</option>
              </select>
              {errors.category && <div style={styles.error}>{errors.category}</div>}
            </div>

            <div style={styles.formCol}>
              <label htmlFor="maxAttendees" style={styles.label}>
                Maximum Attendees
              </label>
              <input
                type="number"
                id="maxAttendees"
                name="maxAttendees"
                placeholder="Leave blank for unlimited"
                value={formData.maxAttendees}
                onChange={handleChange}
                min="1"
                style={{
                  ...styles.input,
                  ...(errors.maxAttendees ? { borderColor: '#ef4444' } : {})
                }}
              />
              {errors.maxAttendees && <div style={styles.error}>{errors.maxAttendees}</div>}
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Date & Location</h2>
          
          <div style={styles.formRow}>
            <div style={styles.formCol}>
              <label htmlFor="date" style={styles.label}>
                Date <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.date ? { borderColor: '#ef4444' } : {})
                }}
              />
              {errors.date && <div style={styles.error}>{errors.date}</div>}
            </div>

            <div style={styles.formCol}>
              <label htmlFor="time" style={styles.label}>
                Time <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.time ? { borderColor: '#ef4444' } : {})
                }}
              />
              {errors.time && <div style={styles.error}>{errors.time}</div>}
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="location" style={styles.label}>
              Location <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="City, Country or specific venue"
              value={formData.location}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.location ? { borderColor: '#ef4444' } : {})
              }}
            />
            {errors.location && <div style={styles.error}>{errors.location}</div>}
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="meetingPoint" style={styles.label}>
              Meeting Point
            </label>
            <input
              type="text"
              id="meetingPoint"
              name="meetingPoint"
              placeholder="Specific meeting location (e.g., parking lot, entrance)"
              value={formData.meetingPoint}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.meetingPoint ? { borderColor: '#ef4444' } : {})
              }}
            />
            {errors.meetingPoint && <div style={styles.error}>{errors.meetingPoint}</div>}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Event Details</h2>
          
          <div style={styles.formRow}>
            <div style={styles.formCol}>
              <label htmlFor="difficulty" style={styles.label}>
                Difficulty Level
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                style={{
                  ...styles.select,
                  ...(errors.difficulty ? { borderColor: '#ef4444' } : {})
                }}
              >
                <option value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="challenging">Challenging</option>
                <option value="extreme">Extreme</option>
              </select>
              {errors.difficulty && <div style={styles.error}>{errors.difficulty}</div>}
            </div>

            <div style={styles.formCol}>
              <label htmlFor="duration" style={styles.label}>
                Duration (hours)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                placeholder="Event duration in hours"
                value={formData.duration}
                onChange={handleChange}
                step="0.5"
                min="0.5"
                style={{
                  ...styles.input,
                  ...(errors.duration ? { borderColor: '#ef4444' } : {})
                }}
              />
              {errors.duration && <div style={styles.error}>{errors.duration}</div>}
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Organizer Information</h2>
          
          <div style={styles.formGroup}>
            <label htmlFor="organizer" style={styles.label}>
              Organizer Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              id="organizer"
              name="organizer"
              placeholder="Your name or organization name"
              value={formData.organizer}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.organizer ? { borderColor: '#ef4444' } : {})
              }}
            />
            {errors.organizer && <div style={styles.error}>{errors.organizer}</div>}
          </div>

          <div style={styles.formRow}>
            <div style={styles.formCol}>
              <label htmlFor="contactEmail" style={styles.label}>
                Contact Email <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                placeholder="email@example.com"
                value={formData.contactEmail}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.contactEmail ? { borderColor: '#ef4444' } : {})
                }}
              />
              {errors.contactEmail && <div style={styles.error}>{errors.contactEmail}</div>}
            </div>

            <div style={styles.formCol}>
              <label htmlFor="contactPhone" style={styles.label}>
                Contact Phone (optional)
              </label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                placeholder="+1 123 456 7890"
                value={formData.contactPhone}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.contactPhone ? { borderColor: '#ef4444' } : {})
                }}
              />
              {errors.contactPhone && <div style={styles.error}>{errors.contactPhone}</div>}
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Event Image</h2>
          
          <div style={styles.formGroup}>
            <label htmlFor="image" style={styles.label}>
              Upload Event Image <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '10px' }}>
              Choose an attractive image that represents your event. Recommended size: 1200 x 630 pixels.
            </p>
            
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.imageUpload}
            />
            
            <div style={styles.imagePreviewContainer}>
              {formData.previewUrl ? (
                <img 
                  src={formData.previewUrl} 
                  alt="Event preview" 
                  style={styles.imagePreview} 
                />
              ) : (
                <div style={styles.uploadPlaceholder}>
                  <i className="fas fa-cloud-upload-alt" style={styles.uploadIcon}></i>
                  <p>Upload an image to preview it here</p>
                </div>
              )}
            </div>
            {errors.image && <div style={styles.error}>{errors.image}</div>}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Additional Information</h2>
          
          <div style={styles.formGroup}>
            <label htmlFor="whatToBring" style={styles.label}>
              What to Bring (One item per line)
            </label>
            <textarea
              id="whatToBring"
              name="whatToBring"
              placeholder="Enter items to bring, one per line"
              value={formData.whatToBring.join('\n')}
              onChange={handleWhatToBringChange}
              style={{
                ...styles.textarea,
                ...(errors.whatToBring ? { borderColor: '#ef4444' } : {})
              }}
            />
            {errors.whatToBring && <div style={styles.error}>{errors.whatToBring}</div>}
            <div style={{ color: '#64748b', fontSize: '14px', marginTop: '5px' }}>
              Limit: 20 items, 100 characters each
            </div>
          </div>
        </div>

        {errors.submit && (
          <div style={{ ...styles.error, textAlign: 'center', marginBottom: '15px' }}>
            {errors.submit}
          </div>
        )}

        <div style={styles.buttonGroup}>
          <Link to="/events" style={styles.cancelButton}>Cancel</Link>
          
          <button 
            type="submit" 
            style={{
              ...styles.submitButton,
              ...(isSubmitting ? styles.disabledButton : {})
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div style={styles.spinner}></div>
                Creating...
              </>
            ) : (
              <>
                <i className="fas fa-plus" style={styles.buttonIcon}></i>
                Create Event
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
