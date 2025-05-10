import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SharedItineraries = () => {
  const [sharedItineraries, setSharedItineraries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data for demo
  useEffect(() => {
    const sharedData = [
      { 
        id: 5, 
        title: "Japan Adventure", 
        startDate: "2023-12-05", 
        endDate: "2023-12-15", 
        destination: "Tokyo, Japan", 
        sharedBy: "Alex Johnson",
        sharedByEmail: "alex@example.com",
        permission: "view",
        dateShared: "2023-10-10",
        description: "Explore the vibrant streets of Tokyo and historic temples of Kyoto.",
        imageUrl: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
      },
      { 
        id: 6, 
        title: "European Tour", 
        startDate: "2024-03-10", 
        endDate: "2024-03-25", 
        destination: "Various Cities, Europe", 
        sharedBy: "Maria Garcia",
        sharedByEmail: "maria@example.com",
        permission: "edit",
        dateShared: "2023-10-05",
        description: "A comprehensive tour of Europe's most iconic cities and landmarks.",
        imageUrl: "https://images.unsplash.com/photo-1490642914619-7955a3fd483c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      { 
        id: 7, 
        title: "Safari Adventure", 
        startDate: "2024-02-15", 
        endDate: "2024-02-22", 
        destination: "Kenya", 
        sharedBy: "David Wilson",
        sharedByEmail: "david@example.com",
        permission: "view",
        dateShared: "2023-09-28",
        description: "Experience the wildlife of Kenya with guided safaris and nature walks.",
        imageUrl: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
      }
    ];
    
    setSharedItineraries(sharedData);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItineraries = sharedItineraries.filter(itinerary => 
    itinerary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    itinerary.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    itinerary.sharedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Shared With Me
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '800px' }}>
            View and manage itineraries that others have shared with you.
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
              placeholder="Search shared itineraries..."
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
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  backgroundColor: itinerary.permission === 'edit' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(59, 130, 246, 0.9)',
                  padding: '5px 10px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <i className={itinerary.permission === 'edit' ? 'fas fa-edit' : 'fas fa-eye'}></i>
                  {itinerary.permission === 'edit' ? 'Can Edit' : 'View Only'}
                </div>
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
                    margin: '0 0 5px 0'
                  }}>
                    <i className="far fa-calendar-alt"></i>
                    {formatDate(itinerary.startDate)} - {formatDate(itinerary.endDate)}
                  </p>
                  <p style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    color: '#6b7280',
                    fontSize: '14px',
                    margin: 0
                  }}>
                    <i className="fas fa-user"></i>
                    Shared by: {itinerary.sharedBy}
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
                  <Link to={`/shared-itinerary/${itinerary.id}`} style={{ 
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
                  <span style={{ 
                    color: '#6b7280', 
                    fontSize: '14px',
                  }}>
                    Shared: {formatDate(itinerary.dateShared)}
                  </span>
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
            <p style={{ color: '#6b7280' }}>No shared itineraries found. When someone shares an itinerary with you, it will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedItineraries;
