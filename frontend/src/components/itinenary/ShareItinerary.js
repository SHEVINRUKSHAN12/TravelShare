import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ShareItinerary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [permission, setPermission] = useState('view');
  const [sharedWith, setSharedWith] = useState([]);

  // Sample data for demo
  useEffect(() => {
    // Simulate fetching itinerary data
    setItinerary({
      id: parseInt(id || '1'),
      title: "Weekend in Paris",
      destination: "Paris, France",
      startDate: "2023-11-15",
      endDate: "2023-11-17",
    });

    // Simulate fetching sharing data
    setSharedWith([
      { id: 1, email: 'friend@example.com', permission: 'view', dateShared: '2023-10-15' },
      { id: 2, email: 'family@example.com', permission: 'edit', dateShared: '2023-10-16' }
    ]);
  }, [id]);

  const handleShare = (e) => {
    e.preventDefault();
    
    if (email.trim() === '') {
      alert('Please enter an email address');
      return;
    }
    
    // In a real app, this would send a request to your backend
    console.log('Sharing itinerary with:', { email, permission, message });
    
    // Simulate adding to shared list
    const newShare = {
      id: sharedWith.length + 1,
      email: email,
      permission: permission,
      dateShared: new Date().toISOString().split('T')[0]
    };
    
    setSharedWith([...sharedWith, newShare]);
    setEmail('');
    setMessage('');
    alert(`Itinerary shared with ${email}`);
  };

  const removeShare = (shareId) => {
    // In a real app, this would send a request to your backend
    setSharedWith(sharedWith.filter(share => share.id !== shareId));
  };

  if (!itinerary) {
    return (
      <div className="container" style={{ padding: '50px 0', textAlign: 'center' }}>
        <p>Loading itinerary details...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '50px 0' }}>
      <div className="container">
        <div style={{ marginBottom: '30px' }}>
          <h2>Share Itinerary</h2>
          <h4 style={{ color: '#666' }}>{itinerary.title}</h4>
          <p>Destination: {itinerary.destination}</p>
          <p>Dates: {itinerary.startDate} to {itinerary.endDate}</p>
        </div>
        
        <div className="row">
          <div className="col-md-6">
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '25px', 
              borderRadius: '8px',
              marginBottom: '30px'
            }}>
              <h3 style={{ marginBottom: '20px' }}>Share with Others</h3>
              <form onSubmit={handleShare}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="permission" className="form-label">Permission</label>
                  <select
                    className="form-control"
                    id="permission"
                    value={permission}
                    onChange={(e) => setPermission(e.target.value)}
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                  >
                    <option value="view">View only</option>
                    <option value="edit">Can edit</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Personal Message (optional)</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn"
                  style={{ 
                    backgroundColor: '#ff7f47', 
                    color: 'white', 
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px'
                  }}
                >
                  Share Itinerary
                </button>
              </form>
            </div>
            
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '25px', 
              borderRadius: '8px'
            }}>
              <h3 style={{ marginBottom: '20px' }}>Public Link</h3>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={`https://travel-planner.com/shared/itinerary/${itinerary.id}`}
                  readOnly
                  style={{ padding: '10px', borderRadius: '5px 0 0 5px', border: '1px solid #ddd' }}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  style={{ 
                    borderRadius: '0 5px 5px 0', 
                    border: '1px solid #ddd',
                    borderLeft: 'none'
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(`https://travel-planner.com/shared/itinerary/${itinerary.id}`);
                    alert('Link copied to clipboard!');
                  }}
                >
                  Copy
                </button>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="enablePublicLink"
                />
                <label className="form-check-label" htmlFor="enablePublicLink">
                  Enable public link (anyone with the link can view)
                </label>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
            }}>
              <h3 style={{ marginBottom: '20px' }}>Currently Shared With</h3>
              
              {sharedWith.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                  This itinerary hasn't been shared with anyone yet.
                </p>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Permission</th>
                      <th>Date Shared</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sharedWith.map(share => (
                      <tr key={share.id}>
                        <td>{share.email}</td>
                        <td>
                          <span style={{ 
                            padding: '3px 8px', 
                            borderRadius: '12px', 
                            fontSize: '0.8rem',
                            backgroundColor: share.permission === 'edit' ? '#d4edda' : '#e2e3e5',
                            color: share.permission === 'edit' ? '#155724' : '#383d41'
                          }}>
                            {share.permission === 'edit' ? 'Can edit' : 'View only'}
                          </span>
                        </td>
                        <td>{share.dateShared}</td>
                        <td>
                          <button
                            onClick={() => removeShare(share.id)}
                            className="btn btn-sm"
                            style={{ 
                              color: '#dc3545', 
                              border: 'none',
                              background: 'none',
                              padding: '5px'
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              
              <div style={{ marginTop: '30px' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(`/itinerary/${id}`)}
                  style={{ 
                    marginRight: '10px',
                    backgroundColor: '#6c757d', 
                    color: 'white', 
                    border: 'none',
                    borderRadius: '5px'
                  }}
                >
                  Back to Itinerary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareItinerary;
