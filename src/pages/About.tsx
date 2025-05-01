import React from 'react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        <button
          onClick={() => navigate('/')}
          className="text-2xl font-bold text-purple-900 hover:text-purple-700 transition-colors duration-200 mb-8"
        >
          AdMaxer
        </button>

        <h1 className="text-3xl font-bold text-purple-900 mb-6">About AdMaxer</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-purple-800 mb-2">What is AdMaxer?</h2>
            <p>
              AdMaxer is a fun web application that lets you send prank messages to your friends. The recipient must close a series of popups before they can read the actual message, making it a unique and entertaining way to communicate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-800 mb-2">Our Mission</h2>
            <p>
              We aim to bring fun and excitement to digital communication while maintaining a safe and enjoyable experience for all users. Our platform combines humor with technology to create memorable moments between friends.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-800 mb-2">Features</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>Create and share prank messages</li>
              <li>Customize the number of popups</li>
              <li>Generate QR codes for easy sharing</li>
              <li>Rate limiting to prevent abuse</li>
              <li>Responsive design for all devices</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About; 