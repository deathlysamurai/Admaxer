import React from 'react';

interface MessageDisplayProps {
  showMessage: boolean;
  decodedSender: string;
  displayMessage: string;
  theme: any;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ showMessage, decodedSender, displayMessage, theme }) => {
  if (!showMessage) return null;
  
  return (
      <div className={`rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4 ${theme.backgroundColor} ${theme.borderColor} border-2`}>
        <h2 className={`text-xl font-semibold mb-4 ${theme.textColor}`}>Message from {decodedSender}</h2>
        <div className={`p-4 sm:p-6 rounded-lg ${theme.backgroundColor === 'bg-black' ? 'bg-gray-900' : 'bg-purple-50'}`}>
          <p className={theme.id === 'dark' ? 'text-black' : theme.textColor}>{displayMessage}</p>
        </div>
      </div>
  );
};

export default MessageDisplay;