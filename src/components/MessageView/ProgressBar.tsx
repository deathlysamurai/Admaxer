import React from 'react';

interface ProgressBarProps {
  delayActive: boolean;
  totalProgress: number;
  closedBoxes: number;
  remainingPopups: number;
  theme: any;
  askQuestions: boolean;
  userReady: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ delayActive, totalProgress, closedBoxes, remainingPopups, theme, askQuestions, userReady }) => {
  if (delayActive || askQuestions || !userReady) return null;

  return (
    <div className={`mt-2 md:mt-0 ${theme.backgroundColor} rounded-lg p-4 shadow-lg`}>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${theme.buttonColor} h-2.5 rounded-full transition-all duration-300`}
          style={{ width: `${totalProgress}%` }}
        ></div>
      </div>
      <p className={`text-sm mt-2 text-center ${theme.textColor}`}>
        Progress: {closedBoxes} of {remainingPopups} popups closed ({totalProgress}%)
      </p>
    </div>
  );
};

export default ProgressBar;
