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

// Import Itinerary components
import TripPlanningDashboard from './components/itinenary/TripPlanningDashboard';
import CreateItinerary from './components/itinenary/CreateItinerary';
import ShareItinerary from './components/itinenary/ShareItinerary';
import SharedItineraries from './components/itinenary/SharedItineraries';
import PackingList from './components/itinenary/PackingList';
import ItineraryHome from './components/itinenary/ItineraryHome';
import ItinerarySharing from './components/itinenary/ItinerarySharing';

// Import Event Management components
import EventDashboard from './components/events/EventDashboard';
import EventDetails from './components/events/EventDetails';
import CreateEvent from './components/events/CreateEvent';
import EditEvent from './components/events/EditEvent';

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

          {/* Itinerary/Trip Planning Routes */}
          <Route path="/planning" element={<TripPlanningDashboard />} />
          <Route path="/itinerary" element={<ItineraryHome />} />
          <Route path="/itinerary/create" element={<CreateItinerary />} />
          <Route path="/itinerary/:id" element={<ItineraryHome />} /> {/* For viewing specific itinerary */}
          <Route path="/itinerary/:id/share" element={<ShareItinerary />} />
          <Route path="/shared-itineraries" element={<SharedItineraries />} />
          <Route path="/shared-itinerary/:id" element={<ItineraryHome />} /> {/* For viewing shared itinerary */}
          <Route path="/packing-lists" element={<PackingList />} />
          <Route path="/itinerary-sharing" element={<ItinerarySharing />} />

          {/* Event Management Routes */}
          <Route path="/events" element={<EventDashboard />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/edit/:id" element={<EditEvent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
