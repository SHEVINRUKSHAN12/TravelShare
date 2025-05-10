import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/itineraries';

const CreateItinerary = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
    type: 'city',
    activities: [{ day: 1, items: [{ time: '', description: '' }] }]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleActivityChange = (dayIndex, itemIndex, field, value) => {
    const updatedActivities = [...formData.activities];
    updatedActivities[dayIndex].items[itemIndex][field] = value;
    setFormData(prev => ({ ...prev, activities: updatedActivities }));
  };

  const addActivityItem = (dayIndex) => {
    const updatedActivities = [...formData.activities];
    updatedActivities[dayIndex].items.push({ time: '', description: '' });
    setFormData(prev => ({ ...prev, activities: updatedActivities }));
  };

  const addDay = () => {
    const newDay = formData.activities.length + 1;
    setFormData(prev => ({
      ...prev,
      activities: [...prev.activities, { day: newDay, items: [{ time: '', description: '' }] }]
    }));
  };

  const removeActivityItem = (dayIndex, itemIndex) => {
    const updatedActivities = [...formData.activities];
    updatedActivities[dayIndex].items.splice(itemIndex, 1);
    if (updatedActivities[dayIndex].items.length === 0) {
      updatedActivities[dayIndex].items.push({ time: '', description: '' });
    }
    setFormData(prev => ({ ...prev, activities: updatedActivities }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.destination || !formData.startDate || !formData.endDate) {
      alert('Please fill out all required fields');
      return;
    }
    
    // Check if end date is after start date
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      alert('End date must be after start date');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Add a sample image based on type
      const itineraryData = {
        ...formData,
        userId: 'user123', // This would normally come from authentication
        username: 'Current User',
        imageUrl: `https://source.unsplash.com/random/800x600/?${formData.type}`
      };
      
      const response = await axios.post(API_URL, itineraryData);
      console.log('Itinerary created:', response.data);
      
      alert('Itinerary created successfully!');
      navigate('/itinerary');
    } catch (err) {
      console.error('Error creating itinerary:', err);
      setError('Failed to create itinerary. Please try again.');
      alert('There was a problem creating your itinerary.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '40px 0', 
      backgroundColor: '#f8f9fa', 
      minHeight: '100vh' 
    }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          marginBottom: '30px'
        }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            color: '#1e3a8a', 
            marginBottom: '10px' 
          }}>
            Create New Itinerary
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '800px' }}>
            Plan your next adventure with a detailed day-by-day itinerary.
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginBottom: '25px'
          }}>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#333', 
              marginBottom: '25px',
              paddingBottom: '15px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              Basic Information
            </h2>
            
            <div className="row">
              <div className="col-md-6" style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="title" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#4b5563' 
                  }}
                >
                  Itinerary Title*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  style={{ 
                    width: '100%',
                    padding: '12px 15px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    transition: 'border-color 0.15s ease-in-out',
                    outline: 'none'
                  }}
                  placeholder="e.g., Weekend in Paris"
                />
              </div>
              
              <div className="col-md-6" style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="destination" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#4b5563' 
                  }}
                >
                  Destination*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  style={{ 
                    width: '100%',
                    padding: '12px 15px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    transition: 'border-color 0.15s ease-in-out',
                    outline: 'none'
                  }}
                  placeholder="e.g., Paris, France"
                />
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6" style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="startDate" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#4b5563' 
                  }}
                >
                  Start Date*
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  style={{ 
                    width: '100%',
                    padding: '12px 15px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    transition: 'border-color 0.15s ease-in-out',
                    outline: 'none'
                  }}
                />
              </div>
              
              <div className="col-md-6" style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="endDate" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#4b5563' 
                  }}
                >
                  End Date*
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  style={{ 
                    width: '100%',
                    padding: '12px 15px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    transition: 'border-color 0.15s ease-in-out',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label 
                htmlFor="description" 
                style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#4b5563' 
                }}
              >
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                style={{ 
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '15px',
                  resize: 'vertical',
                  minHeight: '100px',
                  transition: 'border-color 0.15s ease-in-out',
                  outline: 'none'
                }}
                placeholder="Describe your trip plans, goals, or any important notes..."
              ></textarea>
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginBottom: '25px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px',
              paddingBottom: '15px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h2 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                color: '#333',
                margin: 0
              }}>
                Daily Activities
              </h2>
              
              <button
                type="button"
                className="btn btn-info"
                onClick={addDay}
                style={{ 
                  backgroundColor: '#1e3a8a', 
                  color: 'white', 
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#1e40af'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#1e3a8a'}
              >
                <i className="fas fa-plus"></i>
                Add Day
              </button>
            </div>
            
            {formData.activities.map((day, dayIndex) => (
              <div key={dayIndex} style={{ 
                marginBottom: '30px', 
                padding: '25px', 
                backgroundColor: '#f9fafb', 
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <h4 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#1e3a8a',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{
                      backgroundColor: '#1e3a8a',
                      color: 'white',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      {day.day}
                    </span>
                    Day {day.day}
                  </h4>
                  
                  {formData.activities.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        const updatedActivities = formData.activities.filter((_, i) => i !== dayIndex);
                        // Update day numbers
                        const reorderedActivities = updatedActivities.map((activity, index) => ({
                          ...activity,
                          day: index + 1
                        }));
                        setFormData(prev => ({ ...prev, activities: reorderedActivities }));
                      }}
                      style={{ 
                        backgroundColor: 'transparent',
                        color: '#ef4444',
                        border: '1px solid #ef4444',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#ef4444';
                        e.target.style.color = 'white';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#ef4444';
                      }}
                    >
                      Remove Day
                    </button>
                  )}
                </div>
                
                {day.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="row" style={{ 
                    marginBottom: '12px',
                    backgroundColor: 'white',
                    padding: '15px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div className="col-md-3" style={{ marginBottom: '10px' }}>
                      <label
                        style={{ 
                          display: 'block', 
                          marginBottom: '6px', 
                          fontSize: '13px', 
                          fontWeight: '500', 
                          color: '#4b5563' 
                        }}
                      >
                        Time
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        value={item.time}
                        onChange={(e) => handleActivityChange(dayIndex, itemIndex, 'time', e.target.value)}
                        style={{ 
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          fontSize: '14px',
                          transition: 'border-color 0.15s ease-in-out'
                        }}
                      />
                    </div>
                    <div className="col-md-8" style={{ marginBottom: '10px' }}>
                      <label
                        style={{ 
                          display: 'block', 
                          marginBottom: '6px', 
                          fontSize: '13px', 
                          fontWeight: '500', 
                          color: '#4b5563' 
                        }}
                      >
                        Activity Description
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="What are you planning to do?"
                        value={item.description}
                        onChange={(e) => handleActivityChange(dayIndex, itemIndex, 'description', e.target.value)}
                        style={{ 
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          fontSize: '14px',
                          transition: 'border-color 0.15s ease-in-out'
                        }}
                      />
                    </div>
                    <div className="col-md-1" style={{ 
                      display: 'flex', 
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      marginBottom: '10px'
                    }}>
                      <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={() => removeActivityItem(dayIndex, itemIndex)}
                        style={{ 
                          backgroundColor: '#fee2e2',
                          color: '#ef4444',
                          border: 'none',
                          borderRadius: '6px',
                          width: '30px',
                          height: '30px',
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#fecaca'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#fee2e2'}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => addActivityItem(dayIndex)}
                  style={{ 
                    backgroundColor: 'white',
                    color: '#4b5563',
                    border: '1px solid #d1d5db',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    marginTop: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#f3f4f6';
                    e.target.style.borderColor = '#9ca3af';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.borderColor = '#d1d5db';
                  }}
                >
                  <i className="fas fa-plus"></i>
                  Add Activity
                </button>
              </div>
            ))}
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            marginTop: '30px',
            marginBottom: '20px' 
          }}>
            <button
              type="submit"
              className="btn"
              style={{ 
                backgroundColor: '#10b981',
                color: 'white', 
                padding: '14px 30px',
                fontSize: '16px',
                fontWeight: '500',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.2s ease'
              }}
              disabled={loading}
              onMouseOver={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#059669';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 12px rgba(16, 185, 129, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#10b981';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px rgba(16, 185, 129, 0.2)';
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    border: '3px solid rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    borderTopColor: 'white',
                    animation: 'spin 1s linear infinite'
                  }}></span>
                  Creating...
                </>
              ) : (
                <>
                  <i className="fas fa-check-circle"></i>
                  Create Itinerary
                </>
              )}
            </button>
          </div>
        </form>
        
        {/* Add an animation for the loading spinner */}
        <style>
          {`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default CreateItinerary;
