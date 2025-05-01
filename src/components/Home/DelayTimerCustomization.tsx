import React from 'react';
import { MAX_DELAY } from '../../constants';

interface DelayTimerCustomizationProps {
  delayInput: string;
  setDelayInput: (count: string) => void;
}

const DelayTimerCustomization: React.FC<DelayTimerCustomizationProps> = ({
  delayInput,
  setDelayInput,
}) => {
  return (
    <div>
    <label htmlFor="delay" className="block text-sm font-medium text-gray-700 mb-2">
        Delay in seconds (1-{MAX_DELAY})
    </label>
    <div className="space-y-4">
        <input
        type="range"
        value={delayInput}
        onChange={(e) => setDelayInput(e.target.value)}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        min="1"
        max={MAX_DELAY}
        required
        />
        <input
        type="number"
        value={delayInput}
        onChange={(e) => setDelayInput(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        min="1"
        max={MAX_DELAY}
        required
        />
    </div>
    <p className="text-xs text-gray-500 mt-1">
        Choose how long your friend has to wait before popups appear
    </p>
    </div>
  );
};

export default DelayTimerCustomization;