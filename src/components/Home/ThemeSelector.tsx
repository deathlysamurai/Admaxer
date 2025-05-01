import React, { useState, useEffect } from 'react';
import { Theme, themes, soundEffects, animations } from '../../data/themes';

interface ThemeSelectorProps {
  onThemeChange: (theme: Theme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onThemeChange }) => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);
  const [showPreview, setShowPreview] = useState(true);

  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme);
    onThemeChange(theme);
  };

  const handleAnimationChange = (animation: string) => {
    const updatedTheme = { ...selectedTheme, animation };
    setSelectedTheme(updatedTheme);
    onThemeChange(updatedTheme);
  };

  const handleSoundEffectChange = (sound: keyof typeof soundEffects) => {
    const newTheme = { ...selectedTheme, soundEffect: sound };
    setSelectedTheme(newTheme);
    onThemeChange(newTheme);
    
    // Play the selected sound effect
    const audio = new Audio(soundEffects[sound]);
    audio.play().catch(error => {
      console.error('Error playing sound:', error);
    });
  };

  const handleClosePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    if (selectedTheme.soundEffect && selectedTheme.soundEffect in soundEffects) {
      const audio = new Audio(soundEffects[selectedTheme.soundEffect as keyof typeof soundEffects]);
      audio.play().catch(error => {
        console.error('Error playing sound:', error);
      });
    }
    setShowPreview(false);
  };

  useEffect(() => {
    if (!showPreview) {
      const timer = setTimeout(() => {
        setShowPreview(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showPreview]);

  const animationClass = selectedTheme.animation && selectedTheme.animation in animations 
    ? animations[selectedTheme.animation as keyof typeof animations]
    : animations.fade;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">Theme</h2> */}
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleThemeChange(theme);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTheme.id === theme.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Animation</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(animations).map((animation) => (
                  <button
                    key={animation}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAnimationChange(animation);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedTheme.animation === animation
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                    }`}
                  >
                    {animation.charAt(0).toUpperCase() + animation.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Sound Effect</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(soundEffects).map((sound) => (
                  <button
                    key={sound}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSoundEffectChange(sound as keyof typeof soundEffects);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedTheme.soundEffect === sound
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                    }`}
                  >
                    {sound.charAt(0).toUpperCase() + sound.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 relative min-h-[150px]">
          {showPreview && (
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-xl p-4 w-64 ${animationClass} ${selectedTheme.backgroundColor} ${selectedTheme.borderColor} border-2`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className={`text-sm font-semibold ${selectedTheme.textColor}`}>Advertisement</h3>
                <button
                  onClick={handleClosePreview}
                  className={`${selectedTheme.textColor} hover:opacity-80 focus:outline-none`}
                >
                  ✕
                </button>
              </div>
              <div className={`p-2 rounded ${selectedTheme.backgroundColor === 'bg-black' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client="ca-pub-5173894246439198"
                  data-ad-slot="1432184900"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector; 