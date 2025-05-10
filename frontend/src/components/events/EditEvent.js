import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/events';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    imageUrl: '',
    previewUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        const eventData = response.data;
        
        // Format date for input field if needed
        let formattedDate = eventData.date;
        if (eventData.date && !eventData.date.includes('-')) {
          const date = new Date(eventData.date);
          formattedDate = date.toISOString().split('T')[0];
        }
        
        setFormData({
          ...eventData,
          date: formattedDate,
          previewUrl: eventData.imageUrl
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError("Failed to load event data. Please try again.");
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

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
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        previewUrl: URL.createObjectURL(file)
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.organizer) newErrors.organizer = 'Organizer name is required';
    if (!formData.contactEmail) newErrors.contactEmail = 'Contact email is required';
    
    // Email validation
    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }
    
    // Phone validation (optional field)
    if (formData.contactPhone && !/^\+?[\d\s-]{10,15}$/.test(formData.contactPhone)) {
      newErrors.contactPhone = 'Please enter a valid phone number';
    }

    // Max attendees should be a positive number
    if (formData.maxAttendees && (isNaN(formData.maxAttendees) || parseInt(formData.maxAttendees) <= 0)) {
      newErrors.maxAttendees = 'Please enter a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for API
      const eventData = {
        ...formData,
        maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : 0
      };
      
      // Handle image update
      if (formData.image) {
        // In a real app, handle file upload
        eventData.imageUrl = formData.previewUrl;
      }
      
      // Remove unnecessary fields
      delete eventData.image;
      delete eventData.previewUrl;
      
      const response = await axios.put(`${API_URL}/${id}`, eventData);
      console.log('Event updated:', response.data);
      
      // Redirect to event details page
      navigate(`/events/${id}`, { state: { message: 'Event updated successfully!' } });
    } catch (error) {
      console.error('Error updating event:', error);
      setErrors({
        ...errors,
        submit: 'Failed to update event. Please try again.'
      });
    } finally {
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
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '300px',
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '3px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '50%',
      borderTop: '3px solid #3b82f6',
      animation: 'spin 1s linear infinite',
    },
    buttonSpinner: {
      width: '20px',
      height: '20px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      borderTop: '2px solid white',
      animation: 'spin 1s linear infinite',
      marginRight: '10px',
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={{textAlign: 'center', padding: '50px 0'}}>
          <h2 style={{color: '#ef4444', marginBottom: '20px'}}>Error</h2>
          <p>{error}</p>
          <Link to="/events" style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none'
          }}>Return to Events</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Edit Event</h1>
        <p style={styles.subtitle}>Update your event details</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>
            Event Title <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
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
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              style={styles.input}
            />
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
            value={formData.location}
            onChange={handleChange}
            style={{
              ...styles.input,
              ...(errors.location ? { borderColor: '#ef4444' } : {})
            }}
          />
          {errors.location && <div style={styles.error}>{errors.location}</div>}
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

        <div style={styles.formGroup}>
          <label htmlFor="organizer" style={styles.label}>
            Organizer <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            id="organizer"
            name="organizer"
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
              Contact Phone
            </label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
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

        <div style={styles.formGroup}>
          <label htmlFor="image" style={styles.label}>
            Event Image
          </label>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '10px' }}>
            Current image will be used if no new image is selected
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
            {formData.previewUrl && (
              <img 
                src={formData.previewUrl} 
                alt="Event preview" 
                style={styles.imagePreview} 
              />
            )}
          </div>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="whatToBring" style={styles.label}>
            What to Bring (One item per line)
          </label>
          <textarea
            id="whatToBring"
            name="whatToBring"
            placeholder="Enter items to bring, one per line"
            value={formData.whatToBring ? formData.whatToBring.join('\n') : ''}
            onChange={handleWhatToBringChange}
            style={styles.textarea}
          />
        </div>

        {errors.submit && (
          <div style={{ ...styles.error, textAlign: 'center', marginBottom: '15px' }}>
            {errors.submit}
          </div>
        )}

        <div style={styles.buttonGroup}>
          <Link to={`/events/${id}`} style={styles.cancelButton}>Cancel</Link>
          
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
                <div style={styles.buttonSpinner}></div>
                Updating...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
