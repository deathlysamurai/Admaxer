import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MessageView from './pages/MessageView';
import PrivacyPolicy from './pages/PrivacyPolicy';
import About from './pages/About';
import MessageTemplates from './pages/MessageTemplates';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fun/:encodedData" element={<MessageView />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<About />} />
        <Route path="/templates" element={<MessageTemplates />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
