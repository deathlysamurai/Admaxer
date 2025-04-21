import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MessageView from './components/MessageView';

const App: React.FC = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fun/:sender/:message/:popupCount" element={<MessageView />} />
      </Routes>
    </Router>
  );
};

export default App;
