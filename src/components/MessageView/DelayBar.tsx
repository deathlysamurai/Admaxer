import React, { useEffect, useState } from 'react';

interface DelayBarProps {
  delay: number;
  delayActive: boolean;
  setDelayActive: (active: boolean) => void;
  theme: any;
  askQuestions: boolean;
}

const DelayBar: React.FC<DelayBarProps> = ({ delay, delayActive, setDelayActive, theme, askQuestions }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (delayActive && elapsedTime < delay) {
      const timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
        const audio = new Audio('/sounds/tick.mp3');
        audio.play().catch(error => {
            console.error('Error playing sound:', error);
        });
      }, 1000);

      return () => clearInterval(timer);
    } else if (elapsedTime >= delay) {
      setDelayActive(false);
    }
  }, [delayActive, elapsedTime, delay, setDelayActive]);

  const remainingTime = delay - elapsedTime;

  if (!delayActive && !askQuestions) return null;

  return (
    <div className={`mt-2 md:mt-0 ${theme.backgroundColor} rounded-lg p-4 shadow-lg`}>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${theme.buttonColor} h-2.5 rounded-full transition-all duration-300`}
          style={{ width: `${(elapsedTime / delay) * 100}%` }}
        ></div>
      </div>
      <p className={`text-sm mt-2 text-center ${theme.textColor}`}>
        {remainingTime} seconds before message appears
      </p>
    </div>
  );
};

export default DelayBar;