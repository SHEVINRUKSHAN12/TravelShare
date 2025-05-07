import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ItineraryHome = () => {
  const [itineraries, setItineraries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Sample data for demo
  useEffect(() => {
    const tripData = [
      { 
        id: 1, 
        title: "Weekend in Paris", 
        startDate: "2023-11-15", 
        endDate: "2023-11-17", 
        destination: "Paris, France", 
        shared: 2,
        type: "city",
        description: "A quick weekend getaway to explore the city of lights.",
        imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80"
      },
      { 
        id: 2, 
        title: "Beach Vacation", 
        startDate: "2023-12-10", 
        endDate: "2023-12-20", 
        destination: "Bali, Indonesia", 
        shared: 0,
        type: "beach",
        description: "Relaxing beach holiday with surfing and snorkeling.",
        imageUrl: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      { 
        id: 3, 
        title: "Mountain Trek", 
        startDate: "2024-01-05", 
        endDate: "2024-01-10", 
        destination: "Nepal", 
        shared: 1,
        type: "mountain",
        description: "Hiking adventure through the Himalayas with stunning views.",
        imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      { 
        id: 4, 
        title: "Road Trip", 
        startDate: "2024-02-15", 
        endDate: "2024-02-25", 
        destination: "California, USA", 
        shared: 3,
        type: "road",
        description: "Driving along the stunning California coast.",
        imageUrl: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
      },
    ];
    
    setItineraries(tripData);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredItineraries = itineraries.filter(itinerary => {
    const matchesSearch = 
      itinerary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      itinerary.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      selectedFilter === 'all' || 
      (selectedFilter === 'shared' && itinerary.shared > 0) ||
      itinerary.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
            My Itineraries
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '800px' }}>
            Plan, organize, and track all your travel itineraries in one place.
          </p>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '30px' 
        }}>
          <div style={{ 
            position: 'relative',
            maxWidth: '500px',
            width: '100%'
          }}>
            <input
              type="text"
              placeholder="Search itineraries..."
              value={searchTerm}
              onChange={handleSearch}
              style={{
                width: '100%',
                padding: '12px 20px',
                paddingLeft: '40px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            />
            <i className="fas fa-search" style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }}></i>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/shared-itineraries" style={{ 
              backgroundColor: '#6366f1', 
              color: 'white', 
              padding: '10px 16px', 
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <i className="fas fa-users"></i>
              Shared With Me
            </Link>
            
            <Link to="/itinerary/create" style={{ 
              backgroundColor: '#1e3a8a', 
              color: 'white', 
              padding: '10px 16px', 
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <i className="fas fa-plus"></i>
              Create New
            </Link>
          </div>
        </div>
        
        <div style={{ marginBottom: '30px' }}>
          <div style={{ 
            display: 'flex', 
            backgroundColor: 'white', 
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            maxWidth: 'fit-content'
          }}>
            <button
              onClick={() => handleFilterChange('all')}
              style={{
                padding: '10px 20px',
                backgroundColor: selectedFilter === 'all' ? '#e0f2fe' : 'transparent',
                color: selectedFilter === 'all' ? '#0369a1' : '#6b7280',
                border: 'none',
                borderRight: '1px solid #e5e7eb',
                cursor: 'pointer',
                fontWeight: selectedFilter === 'all' ? '600' : '400',
                fontSize: '14px'
              }}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange('city')}
              style={{
                padding: '10px 20px',
                backgroundColor: selectedFilter === 'city' ? '#e0f2fe' : 'transparent',
                color: selectedFilter === 'city' ? '#0369a1' : '#6b7280',
                border: 'none',
                borderRight: '1px solid #e5e7eb',
                cursor: 'pointer',
                fontWeight: selectedFilter === 'city' ? '600' : '400',
                fontSize: '14px'
              }}
            >
              City
            </button>
            <button
              onClick={() => handleFilterChange('beach')}
              style={{
                padding: '10px 20px',
                backgroundColor: selectedFilter === 'beach' ? '#e0f2fe' : 'transparent',
                color: selectedFilter === 'beach' ? '#0369a1' : '#6b7280',
                border: 'none',
                borderRight: '1px solid #e5e7eb',
                cursor: 'pointer',
                fontWeight: selectedFilter === 'beach' ? '600' : '400',
                fontSize: '14px'
              }}
            >
              Beach
            </button>
            <button
              onClick={() => handleFilterChange('mountain')}
              style={{
                padding: '10px 20px',
                backgroundColor: selectedFilter === 'mountain' ? '#e0f2fe' : 'transparent',
                color: selectedFilter === 'mountain' ? '#0369a1' : '#6b7280',
                border: 'none',
                borderRight: '1px solid #e5e7eb',
                cursor: 'pointer',
                fontWeight: selectedFilter === 'mountain' ? '600' : '400',
                fontSize: '14px'
              }}
            >
              Mountain
            </button>
            <button
              onClick={() => handleFilterChange('shared')}
              style={{
                padding: '10px 20px',
                backgroundColor: selectedFilter === 'shared' ? '#e0f2fe' : 'transparent',
                color: selectedFilter === 'shared' ? '#0369a1' : '#6b7280',
                border: 'none',
                cursor: 'pointer',
                fontWeight: selectedFilter === 'shared' ? '600' : '400',
                fontSize: '14px'
              }}
            >
              Shared
            </button>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
          {filteredItineraries.map(itinerary => (
            <div key={itinerary.id} style={{ 
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer',
              height: '100%',
            }}>
              <div style={{ 
                height: '180px', 
                backgroundImage: `url(${itinerary.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  padding: '5px 10px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#1e3a8a'
                }}>
                  {calculateDuration(itinerary.startDate, itinerary.endDate)} days
                </div>
                {itinerary.shared > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    backgroundColor: 'rgba(16, 185, 129, 0.9)',
                    padding: '5px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <i className="fas fa-share-alt"></i>
                    Shared
                  </div>
                )}
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#333',
                  marginBottom: '10px'
                }}>
                  {itinerary.title}
                </h3>
                <div style={{ marginBottom: '15px' }}>
                  <p style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    color: '#6b7280',
                    fontSize: '14px',
                    margin: '0 0 5px 0'
                  }}>
                    <i className="fas fa-map-marker-alt"></i>
                    {itinerary.destination}
                  </p>
                  <p style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    color: '#6b7280',
                    fontSize: '14px',
                    margin: 0
                  }}>
                    <i className="far fa-calendar-alt"></i>
                    {formatDate(itinerary.startDate)} - {formatDate(itinerary.endDate)}
                  </p>
                </div>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#6b7280', 
                  marginBottom: '20px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: '1.4'
                }}>
                  {itinerary.description}
                </p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '15px'
                }}>
                  <Link to={`/itinerary/${itinerary.id}`} style={{ 
                    color: '#1e3a8a', 
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    View Details
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                  <Link to={`/itinerary/${itinerary.id}/share`} style={{ 
                    color: '#10b981', 
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    backgroundColor: '#f0fdf4',
                    padding: '5px 10px',
                    borderRadius: '5px'
                  }}>
                    <i className="fas fa-share-alt"></i>
                    Share
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItineraries.length === 0 && (
          <div style={{ 
            backgroundColor: 'white', 
            padding: '30px', 
            borderRadius: '10px',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginTop: '20px'
          }}>
            <p style={{ color: '#6b7280' }}>No itineraries found. Try adjusting your search or filter criteria.</p>
          </div>
        )}
        
        {/* Shared Itineraries Section */}
        {itineraries.some(i => i.shared > 0) && (
          <div style={{ marginTop: '40px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px' 
            }}>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                color: '#333',
                margin: 0
              }}>
                My Shared Itineraries
              </h3>
              <Link to="/itinerary-sharing?tab=my-shared" style={{ 
                color: '#1e3a8a', 
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                View All →
              </Link>
            </div>
            
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '10px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                {itineraries.filter(i => i.shared > 0).slice(0, 3).map(itinerary => (
                  <div key={itinerary.id} style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '15px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    width: 'calc(33.33% - 10px)',
                    minWidth: '280px',
                    flexGrow: 1
                  }}>
                    <div style={{ 
                      width: '50px', 
                      height: '50px', 
                      borderRadius: '8px',
                      backgroundImage: `url(${itinerary.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      flexShrink: 0
                    }}></div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 5px 0' }}>{itinerary.title}</h4>
                      <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                        Shared with {itinerary.shared} {itinerary.shared === 1 ? 'person' : 'people'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryHome;
