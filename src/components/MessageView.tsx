import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { decryptMessage } from '../utils/encryption';
import { MAX_POPUPS } from '../constants';

interface PopupBox {
  id: number;
  top: number;
  left: number;
  closed: boolean;
}

const MessageView: React.FC = () => {
  const { sender, message, popupCount } = useParams<{ sender: string, message: string, popupCount: string }>();
  const navigate = useNavigate();
  const [remainingPopups, setRemainingPopups] = useState(Math.min(parseInt(popupCount || '5'), MAX_POPUPS));
  const [showMessage, setShowMessage] = useState(false);
  const [popupBoxes, setPopupBoxes] = useState<PopupBox[]>([]);
  const [closedBoxes, setClosedBoxes] = useState(0);
  const decodedSender = decodeURIComponent(sender || '');
  const decryptedMessage = decryptMessage(message || '');

  // Calculate safe position for popups (keeping them within viewport)
  const getSafePosition = () => {
    // Account for the popup box size (approximately 12rem = 192px)
    const maxTop = 85; // 85% of viewport height
    const maxLeft = 85; // 85% of viewport width
    const minTop = 15; // 15% from top
    const minLeft = 15; // 15% from left
    
    return {
      top: Math.random() * (maxTop - minTop) + minTop,
      left: Math.random() * (maxLeft - minLeft) + minLeft
    };
  };

  useEffect(() => {
    // Load Google AdSense script
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5173894246439198';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (popupBoxes.length < remainingPopups) {
      const timer = setTimeout(() => {
        const position = getSafePosition();
        const newBox: PopupBox = {
          id: popupBoxes.length + 1,
          top: position.top,
          left: position.left,
          closed: false
        };
        setPopupBoxes([...popupBoxes, newBox]);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [popupBoxes, remainingPopups]);

  const handleCloseBox = (id: number) => {
    setPopupBoxes(popupBoxes.map(box => 
      box.id === id ? { ...box, closed: true } : box
    ));
    setClosedBoxes(prev => prev + 1);
    
    if (closedBoxes + 1 === remainingPopups) {
      setShowMessage(true);
    }
  };

  const totalProgress = Math.round((closedBoxes / remainingPopups) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 flex items-center justify-center p-4 relative">
      {/* Header Container */}
      <div className="absolute top-4 left-0 right-0 px-4">
        <div className="max-w-md mx-auto">
          {/* AdMaxer Title - Shows above progress on mobile */}
          <div className="text-center md:text-left md:absolute md:left-4">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-white hover:text-purple-200 transition-colors duration-200"
            >
              AdMaxer
            </button>
          </div>

          {/* Progress Bar Container */}
          <div className="mt-2 md:mt-0 bg-white rounded-lg p-4 shadow-lg">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${totalProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Progress: {closedBoxes} of {remainingPopups} popups closed ({totalProgress}%)
            </p>
          </div>
        </div>
      </div>

      {/* Initial Message Box - Only show if not all popups are closed */}
      {!showMessage && (
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full text-center mx-4 mt-32 md:mt-24">
          <h2 className="text-xl font-semibold mb-4">You've received a message!</h2>
          <p className="text-gray-600">From: {decodedSender}</p>
        </div>
      )}

      {/* Popup Boxes */}
      {popupBoxes.map((box) => (
        !box.closed && (
          <div
            key={box.id}
            className="absolute bg-white rounded-lg shadow-xl p-4 w-64"
            style={{
              top: `${box.top}%`,
              left: `${box.left}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 10
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-gray-800">Advertisement</h3>
              <button
                onClick={() => handleCloseBox(box.id)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                ✕
              </button>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-5173894246439198"
                data-ad-slot="1432184900"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
              <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
              </script>
            </div>
          </div>
        )
      ))}

      {/* Message Display */}
      {showMessage && (
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4">
          <h2 className="text-xl font-semibold mb-4">Message from {decodedSender}</h2>
          <div className="bg-purple-50 p-4 sm:p-6 rounded-lg">
            <p className="text-gray-800">{decryptedMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageView; 