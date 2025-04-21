import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MessageView from './components/MessageView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fun/:sender/:message/:popupCount" element={<MessageView />} />
      </Routes>
    </Router>
  );
}

export default App;
