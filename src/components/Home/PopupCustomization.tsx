import React from 'react';
import { MAX_POPUPS } from '../../constants';
import ThemeSelector from './ThemeSelector';

interface PopupCustomizationProps {
  selectedTheme: any; // Adjust the type as per your Theme type
  setSelectedTheme: (theme: any) => void; // Adjust the type as per your Theme type
  popupCountInput: string;
  setPopupCountInput: (count: string) => void;
}

const PopupCustomization: React.FC<PopupCustomizationProps> = ({
  selectedTheme,
  setSelectedTheme,
  popupCountInput,
  setPopupCountInput,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Popup Theme</label>
      <ThemeSelector onThemeChange={setSelectedTheme} />

      <div className="mt-2">
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
    </div>
  );
};

export default PopupCustomization;
