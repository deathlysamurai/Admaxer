import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRateLimit } from '../hooks/useRateLimit';
import FeaturesGrid from '../components/Home/FeaturesGrid';
import HowItWorks from '../components/Home/HowItWorks';
import HomeForm from '../components/Home/HomeForm';

const Home: React.FC = () => {
  const [error, setError] = useState('');
  const { isLimited, remainingRequests, timeUntilReset, checkLimit, warningThreshold } = useRateLimit();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 flex flex-col">
      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">AdMaxer</h1>
          <h2 className="text-xl text-purple-200 mb-8">The Ultimate Prank Message Platform</h2>
        </div>

        <FeaturesGrid />
        <HowItWorks />

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">Create Your Prank Message</h2>

            <HomeForm isLimited={isLimited} setError={setError} checkLimit={checkLimit} timeUntilReset={timeUntilReset} />

            {remainingRequests <= warningThreshold && (
              <div className="mb-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
                <p className="text-sm">
                  You have {remainingRequests} message{remainingRequests !== 1 ? 's' : ''} remaining.
                  {isLimited && ` Reset in ${timeUntilReset} seconds.`}
                </p>
              </div>
            )}

            {error && remainingRequests > 0 && (
              <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                <p>{error}</p>
                {timeUntilReset > 0 && isLimited && (
                  <p className="text-sm mt-2">Try again in {timeUntilReset} seconds.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="p-4 text-center text-white text-sm">
        <div className="flex justify-center space-x-4">
          <Link to="/privacy" className="hover:text-purple-200 transition-colors duration-200">Privacy Policy</Link>
          <Link to="/about" className="hover:text-purple-200 transition-colors duration-200">About</Link>
        </div>
        <p className="mt-2">© {new Date().getFullYear()} AdMaxer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home; 