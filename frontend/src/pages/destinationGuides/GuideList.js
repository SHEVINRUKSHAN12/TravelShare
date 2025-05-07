import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GuideList = () => {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/guides')
      .then(response => setGuides(response.data))
      .catch(error => console.error('Error fetching guides:', error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2 style={{ color: '#333' }}>Destination Guides</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {guides.map((guide) => (
          <li key={guide.id} style={{ 
            border: '1px solid #ccc', 
            padding: '10px', 
            marginBottom: '10px', 
            borderRadius: '8px', 
            backgroundColor: '#f9f9f9' 
          }}>
            <h3>{guide.title}</h3>
            <p><strong>Destination:</strong> {guide.destination}</p>

            <Link 
              to={`/guides/${guide.id}`} 
              style={{ color: '#007bff', textDecoration: 'underline', marginRight: '15px' }}
            >
              View Details
            </Link>

            <Link 
              to={`/guides/${guide.id}/dashboard`} 
              style={{ color: '#28a745', textDecoration: 'underline' }}
            >
              Manage Guide
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuideList;
