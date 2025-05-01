export interface Theme {
  id: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  buttonColor: string;
  buttonTextColor: string;
  soundEffect?: keyof typeof soundEffects;
  animation?: string;
}

export const themes: Theme[] = [
  {
    id: 'default',
    name: 'Default',
    backgroundColor: 'bg-white',
    textColor: 'text-gray-800',
    borderColor: 'border-gray-200',
    buttonColor: 'bg-purple-600',
    buttonTextColor: 'text-white',
    soundEffect: 'pop',
    animation: 'fade'
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    backgroundColor: 'bg-gray-900',
    textColor: 'text-white',
    borderColor: 'border-gray-700',
    buttonColor: 'bg-purple-500',
    buttonTextColor: 'text-white',
    soundEffect: 'click',
    animation: 'slide'
  },
  {
    id: 'neon',
    name: 'Neon',
    backgroundColor: 'bg-black',
    textColor: 'text-pink-400',
    borderColor: 'border-pink-500',
    buttonColor: 'bg-pink-500',
    buttonTextColor: 'text-white',
    soundEffect: 'ding',
    animation: 'bounce'
  },
  {
    id: 'pastel',
    name: 'Pastel',
    backgroundColor: 'bg-pink-50',
    textColor: 'text-purple-800',
    borderColor: 'border-purple-200',
    buttonColor: 'bg-purple-300',
    buttonTextColor: 'text-white',
    soundEffect: 'chime',
    animation: 'float'
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    backgroundColor: 'bg-blue-200',
    borderColor: 'border-blue-400',
    textColor: 'text-blue-800',
    buttonColor: 'bg-blue-500',
    buttonTextColor: 'text-white',
    animation: 'bounce',
    soundEffect: 'click',
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    backgroundColor: 'bg-orange-200',
    borderColor: 'border-orange-400',
    textColor: 'text-orange-800',
    buttonColor: 'bg-orange-500',
    buttonTextColor: 'text-white',
    animation: 'fade',
    soundEffect: 'ding',
  },
];

export const animations = {
  fade: 'animate-fade-in',
  slide: 'animate-slide-in',
  bounce: 'animate-bounce-in',
  float: 'animate-float-in'
};

export const soundEffects = {
  pop: '/sounds/pop.mp3',
  click: '/sounds/click.mp3',
  ding: '/sounds/ding.mp3',
  chime: '/sounds/chime.mp3'
};