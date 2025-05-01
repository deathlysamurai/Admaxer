import { useState, useEffect } from 'react';

interface RateLimitState {
  count: number;
  lastReset: number;
}

const RATE_LIMIT_WINDOW = 5 * 60 * 1000;
const MAX_REQUESTS = 50; 
const WARNING_THRESHOLD = 10;

export const useRateLimit = () => {
  const [isLimited, setIsLimited] = useState(false);
  const [remainingRequests, setRemainingRequests] = useState(MAX_REQUESTS);
  const [timeUntilReset, setTimeUntilReset] = useState(0);

  useEffect(() => {
    const updateState = () => {
      const storedState = localStorage.getItem('rateLimitState');
      const currentTime = Date.now();
      let state: RateLimitState;

      if (storedState) {
        state = JSON.parse(storedState);
        
        if (currentTime - state.lastReset > RATE_LIMIT_WINDOW) {
          state = { count: 0, lastReset: currentTime };
        }
      } else {
        state = { count: 0, lastReset: currentTime };
      }

      setRemainingRequests(MAX_REQUESTS - state.count);
      setIsLimited(state.count >= MAX_REQUESTS);
      
      const timeLeft = RATE_LIMIT_WINDOW - (currentTime - state.lastReset);
      setTimeUntilReset(Math.max(0, Math.ceil(timeLeft / 1000)));
    };

    updateState();

    const interval = setInterval(updateState, 1000);

    return () => clearInterval(interval);
  }, []);

  const checkLimit = (): boolean => {
    const storedState = localStorage.getItem('rateLimitState');
    const currentTime = Date.now();
    let state: RateLimitState;

    if (storedState) {
      state = JSON.parse(storedState);
      
      if (currentTime - state.lastReset > RATE_LIMIT_WINDOW) {
        state = { count: 0, lastReset: currentTime };
      }
    } else {
      state = { count: 0, lastReset: currentTime };
    }

    if (state.count >= MAX_REQUESTS) {
      setIsLimited(true);
      setRemainingRequests(0);
      return false;
    }

    state.count += 1;
    localStorage.setItem('rateLimitState', JSON.stringify(state));
    setRemainingRequests(MAX_REQUESTS - state.count);
    return true;
  };

  return { 
    isLimited, 
    remainingRequests, 
    timeUntilReset,
    checkLimit,
    warningThreshold: WARNING_THRESHOLD
  };
}; 