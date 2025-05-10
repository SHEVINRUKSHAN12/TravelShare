import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:8080/api';

const PackingList = () => {
  const [packingLists, setPackingLists] = useState([]);
  const [newList, setNewList] = useState({ title: '', destination: '', type: 'beach' });
  const [activeList, setActiveList] = useState(null);
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initial data loading from backend
  useEffect(() => {
    const fetchPackingLists = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/packing-lists`);
        setPackingLists(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching packing lists:', err);
        setError('Failed to load packing lists. Please try again later.');
        setLoading(false);
        
        // Fallback to sample data if API fails
        setPackingLists([
          { id: 1, title: "Beach Essentials", destination: "Maldives", type: "beach", itemCount: 15, completed: 8, imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80" },
          { id: 2, title: "Camping Gear", destination: "Yosemite", type: "camping", itemCount: 22, completed: 15, imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
          { id: 3, title: "City Break", destination: "New York", type: "city", itemCount: 10, completed: 4, imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
          { id: 4, title: "Winter Holiday", destination: "Swiss Alps", type: "winter", itemCount: 18, completed: 2, imageUrl: "https://images.unsplash.com/photo-1551636898-47668aa61de2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" },
        ]);
      }
    };

    fetchPackingLists();
  }, []);

  useEffect(() => {
    if (activeList) {
      const fetchItems = async () => {
        try {
          const response = await axios.get(`${API_URL}/packing-lists/${activeList.id}/items`);
          setItems(response.data);
        } catch (err) {
          console.error('Error fetching items:', err);
          // Fallback to empty items array
          setItems([]);
        }
      };
      
      fetchItems();
    } else {
      setItems([]);
    }
  }, [activeList]);

  const handleCreateList = async (e) => {
    e.preventDefault();
    
    if (!newList.title.trim() || !newList.destination.trim()) {
      alert('Please fill out all required fields');
      return;
    }
    
    const listData = {
      ...newList,
      imageUrl: getRandomImage(newList.type)
    };
    
    try {
      const response = await axios.post(`${API_URL}/packing-lists`, listData);
      setPackingLists([...packingLists, response.data]);
      setNewList({ title: '', destination: '', type: 'beach' });
      alert('Packing list created successfully!');
    } catch (err) {
      console.error('Error creating packing list:', err);
      alert('Failed to create packing list. Please try again.');
    }
  };

  const getRandomImage = (type) => {
    const images = {
      beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      camping: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
      city: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
      mountains: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      winter: "https://images.unsplash.com/photo-1551636898-47668aa61de2",
      'road-trip': "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96",
      international: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05"
    };
    return images[type] || "https://images.unsplash.com/photo-1501785888041-af3ef285b470";
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    
    if (!newItem.trim() || !activeList) return;
    
    const itemData = {
      description: newItem,
      checked: false,
      category: 'general'
    };
    
    try {
      const response = await axios.post(`${API_URL}/packing-lists/${activeList.id}/items`, itemData);
      setItems([...items, response.data]);
      setNewItem('');
    } catch (err) {
      console.error('Error adding item:', err);
      alert('Failed to add item. Please try again.');
    }
  };

  const toggleItemCheck = async (id) => {
    const itemToUpdate = items.find(item => item.id === id);
    if (!itemToUpdate) return;
    
    const updatedItem = {...itemToUpdate, checked: !itemToUpdate.checked};
    
    try {
      await axios.put(`${API_URL}/packing-lists/${activeList.id}/items/${id}`, updatedItem);
      setItems(items.map(item => item.id === id ? updatedItem : item));
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/packing-lists/${activeList.id}/items/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Failed to remove item. Please try again.');
    }
  };

  const filteredPackingLists = packingLists.filter(list =>
    list.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    list.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Display loading state while data is being fetched
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          margin: '0 auto', 
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p>Loading packing lists...</p>
      </div>
    );
  }

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
            My Packing Lists
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '800px' }}>
            Create and manage packing lists for your trips. Never forget an essential item again!
          </p>
        </div>
        
        <div className="row">
          <div className="col-md-4">
            <div style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              marginBottom: '25px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>Create New List</h3>
              <form onSubmit={handleCreateList}>
                <div style={{ marginBottom: '16px' }}>
                  <label 
                    htmlFor="listTitle" 
                    style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#4b5563' 
                    }}
                  >
                    List Title
                  </label>
                  <input
                    type="text"
                    id="listTitle"
                    value={newList.title}
                    onChange={(e) => setNewList({...newList, title: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      transition: 'border-color 0.15s ease-in-out',
                      outline: 'none'
                    }}
                    placeholder="e.g., Beach Essentials"
                  />
                </div>
                
                <div style={{ marginBottom: '16px' }}>
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
                    Destination
                  </label>
                  <input
                    type="text"
                    id="destination"
                    value={newList.destination}
                    onChange={(e) => setNewList({...newList, destination: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      transition: 'border-color 0.15s ease-in-out',
                      outline: 'none'
                    }}
                    placeholder="e.g., Maldives"
                  />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label 
                    htmlFor="listType" 
                    style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#4b5563' 
                    }}
                  >
                    Trip Type
                  </label>
                  <select
                    id="listType"
                    value={newList.type}
                    onChange={(e) => setNewList({...newList, type: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      backgroundColor: 'white',
                      appearance: 'none',
                      backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23424242%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      backgroundSize: '12px auto',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="beach">Beach</option>
                    <option value="mountains">Mountains</option>
                    <option value="city">City</option>
                    <option value="camping">Camping</option>
                    <option value="road-trip">Road Trip</option>
                    <option value="winter">Winter</option>
                    <option value="international">International</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  style={{ 
                    width: '100%',
                    backgroundColor: '#1e3a8a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'background-color 0.15s ease-in-out'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#1e40af'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#1e3a8a'}
                >
                  <i className="fas fa-plus"></i>
                  Create Packing List
                </button>
              </form>
            </div>
            
            <div style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '16px' 
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0 }}>Your Lists</h3>
                <div style={{ position: 'relative', width: '180px' }}>
                  <input
                    type="text"
                    placeholder="Search lists..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      paddingLeft: '32px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '13px',
                      backgroundColor: '#f9fafb'
                    }}
                  />
                  <i className="fas fa-search" style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                    fontSize: '12px'
                  }}></i>
                </div>
              </div>
              
              <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '5px' }}>
                {filteredPackingLists.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '20px 0', 
                    color: '#6b7280', 
                    fontSize: '14px' 
                  }}>
                    No packing lists found
                  </div>
                ) : (
                  filteredPackingLists.map(list => (
                    <div 
                      key={list.id} 
                      onClick={() => setActiveList(list.id)}
                      style={{ 
                        marginBottom: '12px',
                        borderRadius: '8px',
                        border: activeList === list.id ? '2px solid #1e3a8a' : '1px solid #e5e7eb',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        backgroundColor: activeList === list.id ? '#f8fafc' : 'white',
                        boxShadow: activeList === list.id ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                        transform: activeList === list.id ? 'translateY(-2px)' : 'none'
                      }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        overflow: 'hidden'
                      }}>
                        <div style={{ 
                          width: '70px', 
                          height: '70px', 
                          backgroundImage: `url(${list.imageUrl})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          flexShrink: 0
                        }}></div>
                        <div style={{ padding: '12px' }}>
                          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                            {list.title}
                          </h4>
                          <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>
                            {list.destination}
                          </p>
                          <div style={{ 
                            marginTop: '6px', 
                            display: 'flex', 
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            <div style={{ 
                              height: '4px', 
                              width: '60px', 
                              backgroundColor: '#e5e7eb', 
                              borderRadius: '2px',
                              overflow: 'hidden'
                            }}>
                              <div style={{ 
                                height: '100%', 
                                width: `${(list.completed / list.itemCount) * 100}%`, 
                                backgroundColor: list.completed === list.itemCount ? '#10b981' : '#3b82f6',
                                borderRadius: '2px'
                              }}></div>
                            </div>
                            <span style={{ fontSize: '12px', color: '#6b7280' }}>
                              {list.completed}/{list.itemCount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
          <div className="col-md-8">
            {activeList ? (
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ 
                  padding: '25px',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  {packingLists.find(list => list.id === activeList) && (
                    <>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        marginBottom: '16px'
                      }}>
                        <h2 style={{ 
                          fontSize: '24px', 
                          fontWeight: '600', 
                          color: '#1e3a8a',
                          margin: 0
                        }}>
                          {packingLists.find(list => list.id === activeList)?.title}
                        </h2>
                        
                        <div style={{ 
                          display: 'flex', 
                          gap: '8px' 
                        }}>
                          <button style={{ 
                            backgroundColor: 'transparent',
                            border: '1px solid #d1d5db',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            color: '#4b5563',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.15s'
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
                          onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                          >
                            <i className="fas fa-print"></i>
                            Print
                          </button>
                          <button style={{ 
                            backgroundColor: '#1e3a8a',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.15s'
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#1e40af'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#1e3a8a'}
                          >
                            <i className="fas fa-share-alt"></i>
                            Share
                          </button>
                        </div>
                      </div>
                        
                      <div style={{ 
                        backgroundColor: '#f9fafb', 
                        padding: '12px 16px', 
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div>
                          <p style={{ 
                            fontSize: '14px', 
                            color: '#6b7280', 
                            margin: '0 0 4px 0', 
                            display: 'flex', 
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <i className="fas fa-map-marker-alt"></i>
                            Destination: <span style={{ color: '#4b5563', fontWeight: '500' }}>{packingLists.find(list => list.id === activeList)?.destination}</span>
                          </p>
                          <p style={{ 
                            fontSize: '14px', 
                            color: '#6b7280', 
                            margin: 0,
                            display: 'flex', 
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <i className="fas fa-tag"></i>
                            Type: <span style={{ color: '#4b5563', fontWeight: '500' }}>{packingLists.find(list => list.id === activeList)?.type.replace('-', ' ')}</span>
                          </p>
                        </div>
                        <div style={{ 
                          backgroundColor: '#e0f2fe', 
                          color: '#0369a1', 
                          fontWeight: '600', 
                          fontSize: '14px',
                          padding: '6px 16px',
                          borderRadius: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <i className="fas fa-tasks"></i>
                          {packingLists.find(list => list.id === activeList)?.completed}/{packingLists.find(list => list.id === activeList)?.itemCount} Items
                        </div>
                      </div>
                    </>
                  )}
                  
                  <form onSubmit={handleAddItem} style={{ marginTop: '20px' }}>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        placeholder="Add new item..."
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 100px 12px 16px',
                          borderRadius: '8px',
                          border: '1px solid #d1d5db',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'border-color 0.15s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                      />
                      <button
                        type="submit"
                        style={{ 
                          position: 'absolute',
                          right: '5px',
                          top: '5px',
                          backgroundColor: '#1e3a8a',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '7px 15px',
                          fontSize: '13px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#1e40af'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#1e3a8a'}
                      >
                        Add Item
                      </button>
                    </div>
                  </form>
                </div>
                
                <div style={{ 
                  flex: 1, 
                  padding: '10px 25px 25px', 
                  overflowY: 'auto', 
                  maxHeight: '500px'
                }}>
                  {Object.keys(groupedItems).length === 0 ? (
                    <div style={{ 
                      textAlign: 'center', 
                      padding: '30px 0', 
                      color: '#6b7280' 
                    }}>
                      <i className="fas fa-list" style={{ fontSize: '40px', color: '#d1d5db', marginBottom: '15px' }}></i>
                      <p>No items in this list yet. Add some items above!</p>
                    </div>
                  ) : (
                    Object.entries(groupedItems).map(([category, categoryItems]) => (
                      <div key={category} style={{ marginBottom: '20px' }}>
                        <h4 style={{ 
                          fontSize: '14px', 
                          fontWeight: '600', 
                          color: '#4b5563', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.05em',
                          marginBottom: '10px',
                          paddingBottom: '5px',
                          borderBottom: '1px solid #e5e7eb'
                        }}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </h4>
                        
                        {categoryItems.map(item => (
                          <div 
                            key={item.id} 
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              padding: '10px 8px',
                              backgroundColor: item.checked ? '#f8fafc' : 'white',
                              borderRadius: '8px',
                              marginBottom: '8px',
                              transition: 'background-color 0.15s'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = item.checked ? '#f1f5f9' : '#f9fafb'}
                            onMouseOut={(e) => e.target.style.backgroundColor = item.checked ? '#f8fafc' : 'white'}
                          >
                            <div 
                              style={{ 
                                width: '18px', 
                                height: '18px', 
                                borderRadius: '3px', 
                                border: item.checked ? '0' : '1px solid #d1d5db',
                                backgroundColor: item.checked ? '#3b82f6' : 'transparent',
                                marginRight: '10px',
                                position: 'relative',
                                cursor: 'pointer',
                                flexShrink: 0
                              }}
                              onClick={() => toggleItemCheck(item.id)}
                            >
                              {item.checked && (
                                <i className="fas fa-check" style={{ 
                                  position: 'absolute', 
                                  top: '2px', 
                                  left: '3px', 
                                  color: 'white', 
                                  fontSize: '12px' 
                                }}></i>
                              )}
                            </div>
                            <span style={{ 
                              fontSize: '15px', 
                              flex: 1,
                              color: item.checked ? '#9ca3af' : '#333',
                              textDecoration: item.checked ? 'line-through' : 'none'
                            }}>
                              {item.name}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              style={{ 
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: '#ef4444',
                                fontSize: '15px',
                                cursor: 'pointer',
                                padding: '5px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '30px',
                                height: '30px',
                                transition: 'background-color 0.15s',
                                opacity: '0.7'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#fee2e2';
                                e.target.style.opacity = '1';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.opacity = '0.7';
                              }}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div style={{ 
                backgroundColor: 'white', 
                padding: '40px', 
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{ 
                  backgroundColor: '#f0f9ff', 
                  borderRadius: '50%', 
                  width: '100px', 
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <i className="fas fa-suitcase" style={{ fontSize: '40px', color: '#0284c7' }}></i>
                </div>
                <h3 style={{ marginBottom: '15px', fontSize: '20px', fontWeight: '600', color: '#333' }}>Select a Packing List</h3>
                <p style={{ color: '#6b7280', marginBottom: '25px', maxWidth: '400px' }}>
                  Choose a packing list from the left or create a new one for your upcoming trip.
                </p>
                <button
                  onClick={() => {
                    // Focus on the title input field in the Create New List form
                    document.getElementById('listTitle')?.focus();
                  }}
                  style={{ 
                    backgroundColor: '#1e3a8a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px 18px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background-color 0.15s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#1e40af'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#1e3a8a'}
                >
                  <i className="fas fa-plus"></i>
                  Create New Packing List
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackingList;
