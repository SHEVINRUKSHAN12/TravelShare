import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/home';
import TravelDiaries from './components/TravelDiaries/TravelDiaries';
import CreatePostForm from './components/TravelDiaries/CreatePostForm';

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
          autoClose={3000}
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
          <Route path="/diaries/new" element={<CreatePostForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
