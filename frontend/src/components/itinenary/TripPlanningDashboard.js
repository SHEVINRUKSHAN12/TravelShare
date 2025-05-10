import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TripPlanningDashboard = () => {
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [packingLists, setPackingLists] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({
    totalTrips: 0,
    plannedDestinations: 0,
    totalDistance: 0,
    tripsThisYear: 0
  });

  // Sample data loading
  useEffect(() => {
    // Upcoming trips data
    setUpcomingTrips([
      { id: 1, title: "Weekend in Paris", startDate: "2023-11-15", endDate: "2023-11-17", destination: "Paris", imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80" },
      { id: 2, title: "Beach Vacation", startDate: "2023-12-10", endDate: "2023-12-20", destination: "Bali", imageUrl: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
    ]);
    
    // Packing lists data
    setPackingLists([
      { id: 1, title: "Beach Essentials", destination: "Maldives", itemCount: 15, completed: 8 },
      { id: 2, title: "Camping Gear", destination: "Yosemite", itemCount: 22, completed: 15 },
    ]);
    
    // Recent activity
    setRecentActivity([
      { id: 1, type: "itinerary_updated", title: "Weekend in Paris", time: "2 hours ago" },
      { id: 2, type: "packing_item_checked", title: "Beach Essentials", item: "Sunscreen", time: "Yesterday" },
      { id: 3, type: "itinerary_shared", title: "Mountain Trek", sharedWith: "john@example.com", time: "3 days ago" },
    ]);
    
    // Stats
    setStats({
      totalTrips: 8,
      plannedDestinations: 6,
      totalDistance: 12540,
      tripsThisYear: 5
    });
  }, []);

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '30px', paddingBottom: '50px' }}>
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1e3a8a', marginBottom: '20px' }}>
            Trip Planning Dashboard
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '800px' }}>
            Plan your next adventure with our comprehensive trip planning tools. Create detailed itineraries, 
            manage packing lists, and share your plans with friends and family.
          </p>
        </div>
        
        {/* Quick Stats */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '20px', 
          marginBottom: '40px' 
        }}>
          <div style={{ 
            flex: '1 1 200px', 
            backgroundColor: 'white', 
            borderRadius: '10px', 
            padding: '20px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
          }}>
            <h3 style={{ fontSize: '15px', color: '#6b7280', marginBottom: '10px' }}>Total Trips</h3>
            <p style={{ fontSize: '28px', fontWeight: '700', color: '#1e3a8a' }}>{stats.totalTrips}</p>
          </div>
          <div style={{ 
            flex: '1 1 200px', 
            backgroundColor: 'white', 
            borderRadius: '10px', 
            padding: '20px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
          }}>
            <h3 style={{ fontSize: '15px', color: '#6b7280', marginBottom: '10px' }}>Destinations</h3>
            <p style={{ fontSize: '28px', fontWeight: '700', color: '#1e3a8a' }}>{stats.plannedDestinations}</p>
          </div>
          <div style={{ 
            flex: '1 1 200px', 
            backgroundColor: 'white', 
            borderRadius: '10px', 
            padding: '20px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
          }}>
            <h3 style={{ fontSize: '15px', color: '#6b7280', marginBottom: '10px' }}>Total Distance</h3>
            <p style={{ fontSize: '28px', fontWeight: '700', color: '#1e3a8a' }}>{stats.totalDistance} km</p>
          </div>
          <div style={{ 
            flex: '1 1 200px', 
            backgroundColor: 'white', 
            borderRadius: '10px', 
            padding: '20px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
          }}>
            <h3 style={{ fontSize: '15px', color: '#6b7280', marginBottom: '10px' }}>Trips This Year</h3>
            <p style={{ fontSize: '28px', fontWeight: '700', color: '#1e3a8a' }}>{stats.tripsThisYear}</p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          flexWrap: 'wrap', 
          marginBottom: '40px' 
        }}>
          <Link to="/itinerary/create" style={{ 
            flex: '1 1 200px',
            backgroundColor: '#1e3a8a', 
            color: 'white', 
            padding: '15px 25px', 
            borderRadius: '8px',
            textDecoration: 'none',
            textAlign: 'center',
            fontWeight: '600',
            transition: 'background-color 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <i className="fas fa-plus-circle"></i>
            New Itinerary
          </Link>
          <Link to="/packing-lists" style={{ 
            flex: '1 1 200px',
            backgroundColor: '#ff7f47', 
            color: 'white', 
            padding: '15px 25px', 
            borderRadius: '8px',
            textDecoration: 'none',
            textAlign: 'center',
            fontWeight: '600',
            transition: 'background-color 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <i className="fas fa-list-ul"></i>
            Manage Packing Lists
          </Link>
          <Link to="/shared-itineraries" style={{ 
            flex: '1 1 200px',
            backgroundColor: '#10b981', 
            color: 'white', 
            padding: '15px 25px', 
            borderRadius: '8px',
            textDecoration: 'none',
            textAlign: 'center',
            fontWeight: '600',
            transition: 'background-color 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <i className="fas fa-share-alt"></i>
            Shared With Me
          </Link>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
          {/* Upcoming Trips Section */}
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#333' }}>Upcoming Trips</h2>
              <Link to="/itinerary" style={{ 
                color: '#1e3a8a', 
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                View All →
              </Link>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {upcomingTrips.map(trip => (
                <Link to={`/itinerary/${trip.id}`} key={trip.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ 
                    display: 'flex',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}>
                    <div style={{ 
                      width: '120px',
                      height: '120px',
                      backgroundImage: `url(${trip.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} />
                    <div style={{ padding: '15px', flex: '1' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>{trip.title}</h3>
                      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                        <i className="fas fa-map-marker-alt" style={{ marginRight: '5px' }}></i> {trip.destination}
                      </p>
                      <p style={{ fontSize: '14px', color: '#6b7280' }}>
                        <i className="far fa-calendar-alt" style={{ marginRight: '5px' }}></i> 
                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                      </p>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'center',
                      padding: '15px',
                      backgroundColor: '#f8f9fa',
                      alignItems: 'center',
                      minWidth: '80px'
                    }}>
                      <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Days left</p>
                      <p style={{ 
                        fontSize: '24px', 
                        fontWeight: '700', 
                        color: '#1e3a8a',
                        margin: 0
                      }}>
                        {Math.max(0, Math.floor((new Date(trip.startDate) - new Date()) / (1000 * 60 * 60 * 24)))}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              
              {upcomingTrips.length === 0 && (
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '30px', 
                  borderRadius: '10px',
                  textAlign: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <p style={{ color: '#6b7280' }}>No upcoming trips. Plan your next adventure!</p>
                  <Link to="/itinerary/create" style={{ 
                    display: 'inline-block',
                    marginTop: '15px',
                    padding: '8px 16px',
                    backgroundColor: '#1e3a8a',
                    color: 'white',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Create New Itinerary
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Packing Lists & Recent Activity */}
          <div style={{ flex: '1 1 350px' }}>
            {/* Packing Lists Section */}
            <div style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#333' }}>Packing Lists</h2>
                <Link to="/packing-lists" style={{ 
                  color: '#1e3a8a', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  View All →
                </Link>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {packingLists.map(list => (
                  <Link to={`/packing-lists`} key={list.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ 
                      backgroundColor: 'white',
                      borderRadius: '10px',
                      padding: '15px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>{list.title}</h3>
                          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{list.destination}</p>
                        </div>
                        <div style={{ 
                          backgroundColor: '#f1f5f9', 
                          borderRadius: '15px', 
                          padding: '3px 10px',
                          fontSize: '12px',
                          color: '#475569',
                          fontWeight: '500'
                        }}>
                          {list.completed}/{list.itemCount} items
                        </div>
                      </div>
                      
                      <div style={{ marginTop: '12px' }}>
                        <div style={{ 
                          height: '6px', 
                          backgroundColor: '#e2e8f0', 
                          borderRadius: '3px', 
                          overflow: 'hidden' 
                        }}>
                          <div style={{ 
                            height: '100%', 
                            width: `${(list.completed / list.itemCount) * 100}%`, 
                            backgroundColor: list.completed === list.itemCount ? '#10b981' : '#ff7f47',
                            borderRadius: '3px'
                          }}></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                
                {packingLists.length === 0 && (
                  <div style={{ 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    borderRadius: '10px',
                    textAlign: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <p style={{ color: '#6b7280' }}>No packing lists created yet.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Recent Activity Section */}
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>Recent Activity</h2>
              
              <div style={{ 
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                {recentActivity.map((activity, index) => (
                  <div key={activity.id} style={{ 
                    padding: '15px 20px',
                    borderBottom: index < recentActivity.length - 1 ? '1px solid #e5e7eb' : 'none'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <div style={{ 
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: activity.type.includes('itinerary') ? '#e0f2fe' : '#f0fdf4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '12px',
                        flexShrink: 0
                      }}>
                        <i className={
                          activity.type === 'itinerary_updated' ? 'fas fa-edit' : 
                          activity.type === 'packing_item_checked' ? 'fas fa-check' : 
                          'fas fa-share-alt'
                        } style={{ 
                          color: activity.type.includes('itinerary') ? '#0ea5e9' : '#10b981',
                          fontSize: '14px'
                        }}></i>
                      </div>
                      <div>
                        <p style={{ margin: 0, color: '#333', fontSize: '14px' }}>
                          {activity.type === 'itinerary_updated' && `Updated itinerary "${activity.title}"`}
                          {activity.type === 'packing_item_checked' && `Checked off "${activity.item}" in "${activity.title}" packing list`}
                          {activity.type === 'itinerary_shared' && `Shared "${activity.title}" with ${activity.sharedWith}`}
                        </p>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '12px', marginTop: '3px' }}>{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {recentActivity.length === 0 && (
                  <div style={{ padding: '20px', textAlign: 'center' }}>
                    <p style={{ color: '#6b7280' }}>No recent activity to show.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanningDashboard;
