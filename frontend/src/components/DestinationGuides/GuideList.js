import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const GuideList = () => {
  const [guides, setGuides] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [countries, setCountries] = useState([]);
  const [hoveredGuide, setHoveredGuide] = useState(null);

  const [likedGuides, setLikedGuides] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('likedGuides'));
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  });

  const [currentPage, setCurrentPage] = useState(1);
  const guidesPerPage = 6;

  useEffect(() => {
    axios.get('http://localhost:8080/api/guides')
      .then(response => {
        const data = response.data;
        setGuides(data);

        const categorySet = new Set();
        const tagSet = new Set();
        const countrySet = new Set();

        data.forEach(guide => {
          if (guide.category) categorySet.add(guide.category);
          if (Array.isArray(guide.tags)) guide.tags.forEach(tag => tagSet.add(tag));
          const parts = guide.destination?.split(',');
          if (parts?.length > 1) {
            const country = parts[1].trim();
            if (country) countrySet.add(country);
          }
        });

        setCategories([...categorySet].sort());
        setTags([...tagSet].sort());
        setCountries([...countrySet].sort());
      })
      .catch(error => console.error('Error fetching guides:', error));
  }, []);

  const toggleLike = (guideId) => {
    let updatedLikes;
    if (likedGuides.includes(guideId)) {
      updatedLikes = likedGuides.filter(id => id !== guideId);
    } else {
      updatedLikes = [...likedGuides, guideId];
    }
    setLikedGuides(updatedLikes);
    localStorage.setItem('likedGuides', JSON.stringify(updatedLikes));
  };

  const filteredGuides = guides.filter(guide => {
    const matchesDestination = guide.destination?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter ? guide.category === categoryFilter : true;
    const matchesTags = tagFilter ? (guide.tags || []).includes(tagFilter) : true;
    const guideCountry = guide.destination?.split(',')?.[1]?.trim().toLowerCase();
    const matchesCountry = countryFilter ? guideCountry === countryFilter.toLowerCase() : true;

    return matchesDestination && matchesCategory && matchesTags && matchesCountry;
  });

  const indexOfLastGuide = currentPage * guidesPerPage;
  const indexOfFirstGuide = indexOfLastGuide - guidesPerPage;
  const currentGuides = filteredGuides.slice(indexOfFirstGuide, indexOfLastGuide);
  const totalPages = Math.ceil(filteredGuides.length / guidesPerPage);

  const clearFilters = () => {
    setSearch('');
    setCategoryFilter('');
    setTagFilter('');
    setCountryFilter('');
    setCurrentPage(1);
  };

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial',
      background: 'linear-gradient(to bottom, #c1f0d1, #e0fff2)',
      backgroundImage: 'url("https://www.animatedimages.org/data/media/1269/animated-nature-image-0062.gif")',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>
        {`
          @keyframes falling {
            0% {
              transform: translateY(-100%) rotate(0deg);
              opacity: 0.8;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }

          .leaf {
            position: fixed;
            z-index: 1;
            font-size: 20px;
            user-select: none;
            pointer-events: none;
          }
        `}
      </style>
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="leaf"
          style={{
            left: `${Math.random() * 100}%`,
            animation: `falling ${Math.random() * 10 + 5}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          {['🍂', '🍃', '🌿'][Math.floor(Math.random() * 3)]}
        </div>
      ))}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '20px',
        alignItems: 'center' 
      }}>
        <h2 style={{ 
          background: 'linear-gradient(to right, #2ecc71, #27ae60, #228b22)', 
          color: 'white', 
          padding: '12px', 
          borderRadius: '6px', 
          fontSize: '28px' 
        }}>
          Destination Guides
        </h2>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link 
            to="/guides" 
            style={{ 
              padding: '10px 15px', 
              backgroundColor: '#2980b9', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '5px',
              fontWeight: 'bold'
            }}
          >
            View Guides
          </Link>
          <Link 
            to="/guides/create" 
            style={{ 
              padding: '10px 15px', 
              backgroundColor: '#27ae60', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '5px',
              fontWeight: 'bold'
            }}
          >
            Create Guide
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', fontSize: '18px' }}>
        <input type="text" placeholder="Search by destination" value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}><option value="">All Categories</option>{categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}</select>
        <select value={tagFilter} onChange={(e) => setTagFilter(e.target.value)}><option value="">All Tags</option>{tags.map((tag, idx) => <option key={idx} value={tag}>{tag}</option>)}</select>
        <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}><option value="">All Countries</option>{countries.map((country, idx) => <option key={idx} value={country}>{country}</option>)}</select>
        <button onClick={clearFilters} style={{ background: 'linear-gradient(to right, #2ecc71, #27ae60, #228b22)', color: 'white', border: 'none', padding: '10px 14px', borderRadius: '4px', cursor: 'pointer' }}>Clear Filters</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '10px' }}>
        <AnimatePresence>
          {currentGuides.map((guide) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setHoveredGuide(guide.id)}
              onMouseLeave={() => setHoveredGuide(null)}
              style={{
                border: '1px solid #ccc',
                borderRadius: '12px',
                backgroundColor: hoveredGuide === guide.id ? '#d4edda' : '#ffffff',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                height: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                fontSize: '17px',
                position: 'relative',
                transition: 'background-color 0.3s ease'
              }}
            >
              <div>
                <h4 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px' }}>{guide.title}</h4>
                <p><strong>Destination:</strong> {guide.destination}</p>
                <p><strong>Category:</strong> {guide.category}</p>
                <p><strong>Tags:</strong> {(guide.tags || []).map(tag => tag.startsWith('#') ? tag : `#${tag}`).join(' ')}</p>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <button onClick={() => toggleLike(guide.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>{likedGuides.includes(guide.id) ? '❤️' : '🤍'}</button>
                  <span>{likedGuides.includes(guide.id) ? 1 : 0} Likes</span>
                </div>
                <Link to={`/guides/${guide.id}`} style={{ marginRight: '8px', color: '#2980b9', textDecoration: 'none', fontWeight: 'bold' }}>View</Link>
                <Link to={`/guides/${guide.id}/dashboard`} style={{ color: '#27ae60', textDecoration: 'none', fontWeight: 'bold' }}>Manage</Link>
              </div>
              {hoveredGuide === guide.id && (
                <div style={{ position: 'absolute', bottom: '8px', right: '8px', backgroundColor: '#d1ffd1', padding: '6px 10px', borderRadius: '6px', fontSize: '13px', opacity: 0.95, boxShadow: '0 0 6px rgba(0,0,0,0.15)' }}>
                  🌿 Preview this destination
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px', gap: '14px', fontSize: '18px' }}>
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} style={{ padding: '10px 16px', background: '#eee', borderRadius: '6px', border: '1px solid #ccc', cursor: 'pointer' }}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} style={{ padding: '10px 16px', background: '#eee', borderRadius: '6px', border: '1px solid #ccc', cursor: 'pointer' }}>Next</button>
      </div>
    </div>
  );
};

export default GuideList;
