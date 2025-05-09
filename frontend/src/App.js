import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/home';
import TravelDiaries from './components/TravelDiaries/TravelDiaries';
import CreatePostForm from './components/TravelDiaries/CreatePostForm';
import Register from './components/Register/Register'; // Import the Register component
import Login from './components/Login/Login'; // Import the Login component
import Dashboard from './components/Dashboard/Dashboard'; // Import the Dashboard component
import UserProfile from './components/UserScreens/UserProfile'; // Import UserProfile
import Settings from './components/UserScreens/Settings'; // Import the Settings component

// Import ToastContainer for notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router basename="/travelshare">
      <div className="App">
        {/* Add ToastContainer for notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000} // Updated autoClose duration
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diaries" element={<TravelDiaries />} />
          <Route path="/create" element={<CreatePostForm />} /> {/* Updated route for CreatePostForm */}
          <Route path="/register" element={<Register />} /> {/* Add register route */}
          <Route path="/login" element={<Login />} /> {/* Add login route */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Add dashboard route */}
          <Route path="/profile" element={<UserProfile />} /> {/* Add profile route */}
          <Route path="/settings" element={<Settings />} /> {/* Correct route for Settings */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
