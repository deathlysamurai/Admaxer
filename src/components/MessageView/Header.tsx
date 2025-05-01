import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center md:text-left md:absolute md:left-4">
        <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-white hover:text-purple-200 transition-colors duration-200"
        >
            AdMaxer
        </button>
    </div>
  );
};

export default Header;
