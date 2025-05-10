import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/home';
import TravelDiaries from './components/TravelDiaries/TravelDiaries';
import CreatePostForm from './components/TravelDiaries/CreatePostForm';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import UserProfile from './components/UserScreens/UserProfile';
import Settings from './components/UserScreens/Settings';

// Import DestinationGuides components
import GuideList from './components/DestinationGuides/GuideList';
import GuideDetail from './components/DestinationGuides/GuideDetail';
import GuideDashboard from './components/DestinationGuides/GuideDashboard';
import GuideCreate from './components/DestinationGuides/GuideCreate';

// Import ToastContainer for notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router basename="/travelshare">
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={5000}
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
          <Route path="/create" element={<CreatePostForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />

          {/* DestinationGuides Routes */}
          <Route path="/guides" element={<GuideList />} />
          <Route path="/guides/create" element={<GuideCreate />} />
          <Route path="/guides/:id" element={<GuideDetail />} />
          <Route path="/guides/:id/dashboard" element={<GuideDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
