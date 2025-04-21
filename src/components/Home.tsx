import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { encryptMessage } from '../utils/encryption';
import { MAX_POPUPS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useRateLimit } from '../hooks/useRateLimit';

const Home: React.FC = () => {
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [popupCount, setPopupCount] = useState(5);
  const [showQR, setShowQR] = useState(false);
  const [popupCountInput, setPopupCountInput] = useState('5');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isLimited, remainingRequests, timeUntilReset, checkLimit, warningThreshold } = useRateLimit();

  const generateLink = () => {
    const encodedSender = encodeURIComponent(sender);
    const encryptedMessage = encryptMessage(message);
    return `${window.location.origin}${process.env.PUBLIC_URL}/fun/${encodedSender}/${encryptedMessage}/${popupCount}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLimited) {
      setError(`Rate limit exceeded. Please try again in a few minutes.`);
      return;
    }

    if (!checkLimit()) {
      setError(`Rate limit exceeded. Please try again in a few minutes.`);
      return;
    }

    const popupCount = Math.min(parseInt(popupCountInput), MAX_POPUPS);
    setPopupCount(popupCount);
    setShowQR(true);
    setError('');
  };

  useEffect(() => {
    const newCount = Math.min(parseInt(popupCountInput), MAX_POPUPS);
    setPopupCount(newCount);
  }, [popupCountInput]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">AdMaxer</h1>
          <p className="text-xl text-purple-200 mb-8">The Ultimate Prank Message Platform</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">😈</div>
            <h3 className="text-xl font-semibold text-white mb-2">Prank Your Friends</h3>
            <p className="text-purple-200">Send messages that make your friends work for it</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold text-white mb-2">Create Suspense</h3>
            <p className="text-purple-200">Build anticipation before revealing your message</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-2">Instant Sharing</h3>
            <p className="text-purple-200">Generate and share links or QR codes in seconds</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-4">1</div>
              <p className="text-purple-200 text-center">Write your message and enter your name</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-4">2</div>
              <p className="text-purple-200 text-center">Share the generated link or QR code</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-4">3</div>
              <p className="text-purple-200 text-center">Watch as your friend navigates through ads to read your message</p>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">Create Your Prank Message</h2>
            
            {/* Rate Limit Info */}
            {remainingRequests <= warningThreshold && (
              <div className="mb-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
                <p className="text-sm">
                  You have {remainingRequests} message{remainingRequests !== 1 ? 's' : ''} remaining.
                  {isLimited && ` Reset in ${timeUntilReset} seconds.`}
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                <p>{error}</p>
                {timeUntilReset > 0 && (
                  <p className="text-sm mt-2">Try again in {timeUntilReset} seconds.</p>
                )}
              </div>
            )}

            {!isLimited ? (
              <>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="sender" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      id="sender"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400 resize-none"
                      rows={4}
                      placeholder="Write your prank message here..."
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="popupCount" className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Popups (1-{MAX_POPUPS})
                    </label>
                    <div className="space-y-4">
                      <input
                        type="range"
                        value={popupCountInput}
                        onChange={(e) => setPopupCountInput(e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        min="1"
                        max={MAX_POPUPS}
                        required
                      />
                      <input
                        type="number"
                        value={popupCountInput}
                        onChange={(e) => setPopupCountInput(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        min="1"
                        max={MAX_POPUPS}
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Choose how many popups your friend will need to close before seeing the message
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Generate Prank Link
                  </button>
                </form>

                {showQR && (
                  <div className="mt-8 text-center">
                    <QRCodeSVG value={generateLink()} size={200} className="mx-auto" />
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Share this link with your friend:</p>
                      <input
                        type="text"
                        value={generateLink()}
                        readOnly
                        className="w-full px-4 py-2 rounded-lg border-2 border-purple-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-purple-500"
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">You've reached the message limit for this time period.</p>
                <p className="text-sm text-gray-500">Please try again in {timeUntilReset} seconds.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 