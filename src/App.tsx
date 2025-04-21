import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import MessageView from './components/MessageView';

// Custom hook to handle GitHub Pages routing
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const App: React.FC = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fun/:sender/:message/:popupCount" element={<MessageView />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
