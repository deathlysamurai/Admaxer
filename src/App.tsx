import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import MessageView from './components/MessageView';

// Component to handle GitHub Pages routing
const GitHubPagesRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/?/')) {
      // Remove the leading '/?' to get the actual path
      const actualPath = path.substring(2);
      navigate(actualPath, { replace: true });
    }
  }, [location, navigate]);

  return null;
};

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <GitHubPagesRedirect />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fun/:sender/:message/:popupCount" element={<MessageView />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
