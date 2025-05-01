export interface Template {
  id: string;
  category: string;
  title: string;
  message: string;
  icon: string;
}

export const templates: Template[] = [
  {
    id: 'birthday-1',
    category: 'Birthday',
    title: 'Happy Birthday!',
    message: '🎉 Happy Birthday! You\'re one year closer to being old! 🎂',
    icon: '🎂'
  },
  {
    id: 'birthday-2',
    category: 'Birthday',
    title: 'Birthday Wishes',
    message: '🎈 Another year, another wrinkle! Happy Birthday! 🎁',
    icon: '🎈'
  },
  {
    id: 'birthday-3',
    category: 'Birthday',
    title: 'Age is Just a Number',
    message: '🎊 They say age is just a number... but in your case, it\'s a really big one! Happy Birthday! 🎉',
    icon: '🎊'
  },
  {
    id: 'holiday-1',
    category: 'Holiday',
    title: 'Merry Christmas',
    message: '🎄 Merry Christmas! Hope you get everything you want... except coal! 🎅',
    icon: '🎄'
  },
  {
    id: 'holiday-2',
    category: 'Holiday',
    title: 'Happy New Year',
    message: '🎆 New Year, New You! (Same old me though) 🎇',
    icon: '🎆'
  },
  {
    id: 'holiday-3',
    category: 'Holiday',
    title: 'Happy Halloween',
    message: '👻 Boo! Did I scare you? No? Well, this message might! Happy Halloween! 🎃',
    icon: '👻'
  },
  {
    id: 'holiday-4',
    category: 'Holiday',
    title: 'Happy Valentine\'s Day',
    message: '💝 Roses are red, violets are blue, I made you close popups, and I love you! 💘',
    icon: '💝'
  },
  {
    id: 'holiday-5',
    category: 'Holiday',
    title: 'Happy Easter',
    message: '🐰 Hop hop! The Easter Bunny left you a message... after some popups! 🥚',
    icon: '🐰'
  },
  {
    id: 'holiday-6',
    category: 'Holiday',
    title: 'Happy Thanksgiving',
    message: '🦃 Gobble gobble! Time to give thanks... after closing these popups! 🍗',
    icon: '🦃'
  },
  {
    id: 'holiday-7',
    category: 'Holiday',
    title: 'Happy St. Patrick\'s Day',
    message: '🍀 May the luck of the Irish help you close these popups! 🍀',
    icon: '🍀'
  },
  {
    id: 'holiday-8',
    category: 'Holiday',
    title: 'Happy 4th of July',
    message: '🎆 Happy Independence Day! Freedom from popups is just a few clicks away! 🎆',
    icon: '🎆'
  },
  {
    id: 'holiday-9',
    category: 'Holiday',
    title: 'Happy Labor Day',
    message: '🛠️ Take a break from work to close these popups! Happy Labor Day! 💪',
    icon: '🛠️'
  },
  {
    id: 'holiday-10',
    category: 'Holiday',
    title: 'Happy Mother\'s Day',
    message: '💐 Mom, you\'re the best! Now close these popups to read your special message! 👩‍👧',
    icon: '💐'
  },
  {
    id: 'holiday-11',
    category: 'Holiday',
    title: 'Happy Father\'s Day',
    message: '👨‍👧 Dad, you\'re awesome! A few more popups to go for your special message! 🎁',
    icon: '👨‍👧'
  },
  {
    id: 'holiday-12',
    category: 'Holiday',
    title: 'Happy Hanukkah',
    message: '🕎 May your Hanukkah be filled with light... and a few popups to close! ✨',
    icon: '🕎'
  },
  {
    id: 'holiday-13',
    category: 'Holiday',
    title: 'Happy Diwali',
    message: '🪔 Wishing you a Diwali filled with light and joy... after closing these popups! ✨',
    icon: '🪔'
  },
  {
    id: 'holiday-14',
    category: 'Holiday',
    title: 'Happy Chinese New Year',
    message: '🐉 Gong Xi Fa Cai! May your year be prosperous... after these popups! 🧧',
    icon: '🐉'
  },
  {
    id: 'funny-1',
    category: 'Funny',
    title: 'Just Because',
    message: '🤣 I was going to send you a funny message, but then I remembered you\'re already a joke! 😂',
    icon: '🤣'
  },
  {
    id: 'funny-2',
    category: 'Funny',
    title: 'Prank Time',
    message: '🎭 You\'ve been pranked! But seriously, you\'re awesome! 😊',
    icon: '🎭'
  },
  {
    id: 'funny-3',
    category: 'Funny',
    title: 'Tech Support',
    message: '🖥️ Have you tried turning it off and on again? Just kidding, I have no idea what I\'m doing! 😅',
    icon: '🖥️'
  },
  {
    id: 'romantic-1',
    category: 'Romantic',
    title: 'Love Note',
    message: '💖 Roses are red, violets are blue, I made you close popups, and I love you! 💝',
    icon: '💖'
  },
  {
    id: 'romantic-2',
    category: 'Romantic',
    title: 'Sweet Message',
    message: '💕 You had to work for this message, just like I had to work to win your heart! 💘',
    icon: '💕'
  },
  {
    id: 'romantic-3',
    category: 'Romantic',
    title: 'Love at First Click',
    message: '💖 Every popup you close brings you closer to my heart! 💝',
    icon: '💖'
  },
  {
    id: 'romantic-4',
    category: 'Romantic',
    title: 'Forever Yours',
    message: '💗 Our love is stronger than these popups! 💓',
    icon: '💗'
  },
  {
    id: 'romantic-5',
    category: 'Romantic',
    title: 'Love Story',
    message: '💞 Just like these popups, my love for you keeps growing! 💟',
    icon: '💞'
  },
  {
    id: 'motivational-1',
    category: 'Motivational',
    title: 'Keep Going',
    message: '💪 You\'ve closed all these popups, now go conquer the world! Nothing can stop you! 🚀',
    icon: '💪'
  },
  {
    id: 'motivational-2',
    category: 'Motivational',
    title: 'You Got This',
    message: '🌟 If you can handle these popups, you can handle anything life throws at you! 🌈',
    icon: '🌟',
  },
  {
    id: 'motivational-3',
    category: 'Motivational',
    title: 'Rise Above',
    message: '🚀 Every popup you close is a step closer to your goals! Keep pushing forward! 💪',
    icon: '🚀',
  },
  {
    id: 'motivational-4',
    category: 'Motivational',
    title: 'Unstoppable',
    message: '⚡ You\'re crushing these popups like you crush your goals! Nothing can stop you now! 🎯',
    icon: '⚡',
  },
  {
    id: 'anniversary-1',
    category: 'Anniversary',
    title: 'Happy Anniversary!',
    message: '💑 Another year of love and laughter! Here\'s to many more popups... I mean, years together! 💝',
    icon: '💑'
  },
  {
    id: 'anniversary-2',
    category: 'Anniversary',
    title: 'Love Grows',
    message: '🌹 They say love grows stronger with time... just like your patience with these popups! 💕',
    icon: '🌹'
  },
  {
    id: 'anniversary-3',
    category: 'Anniversary',
    title: 'Milestone Celebration',
    message: '🎉 Congratulations on another year of love! Your relationship is stronger than these popups! 💖',
    icon: '🎉'
  },
  {
    id: 'graduation-1',
    category: 'Graduation',
    title: 'Congratulations Grad!',
    message: '🎓 You did it! Now close these popups like you closed the chapter on your education! 📚',
    icon: '🎓'
  },
  {
    id: 'graduation-2',
    category: 'Graduation',
    title: 'Future is Bright',
    message: '🌟 The world is your oyster! Just like these popups, you can handle anything! 🌈',
    icon: '🌟'
  },
  {
    id: 'graduation-3',
    category: 'Graduation',
    title: 'New Chapter',
    message: '📖 A new chapter begins! May your future be as bright as your patience with these popups! ✨',
    icon: '📖'
  }
];

export const categories = Array.from(new Set(templates.map(template => template.category))); 