import { Question } from '../../data/interfaces';
import { Theme, soundEffects } from '../../data/themes';
import { PopupBoxType } from '../../pages/MessageView';
import { Location } from 'react-router-dom';

const getSafePosition = () => {
    const maxTop = 85;
    const maxLeft = 85;
    const minTop = 15;
    const minLeft = 15;
    
    return {
      top: Math.random() * (maxTop - minTop) + minTop,
      left: Math.random() * (maxLeft - minLeft) + minLeft
    };
};

export const setupGoogleAds = () => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5173894246439198';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
};

export const createPopupBoxes = (popupBoxes: PopupBoxType[], remainingPopups: number, setPopupBoxes: (boxes: PopupBoxType[]) => void) => {
    if (popupBoxes.length < remainingPopups) {
        const timer = setTimeout(() => {
            const position = getSafePosition();
            const newBox: PopupBoxType = {
              id: popupBoxes.length + 1,
              top: position.top,
              left: position.left,
              closed: false
            };
            const audio = new Audio('/sounds/blip.mp3');
            audio.play().catch(error => {
              console.error('Error playing sound:', error);
            });
            setPopupBoxes([...popupBoxes, newBox]);
        }, 500);

        return () => clearTimeout(timer);
    }
}

export const handleCloseBox = (id: number, theme: Theme, popupBoxes: PopupBoxType[], setPopupBoxes: (boxes: PopupBoxType[]) => void, closedBoxes: number, setClosedBoxes: (count: number) => void, setShowMessage: (show: boolean) => void, remainingPopups: number) => {
    if (theme.soundEffect && theme.soundEffect in soundEffects) {
      const audio = new Audio(soundEffects[theme.soundEffect]);
      audio.play().catch(error => {
        console.error('Error playing sound:', error);
      });
    }

    setPopupBoxes(popupBoxes.map(box => 
      box.id === id ? { ...box, closed: true } : box
    ));
    setClosedBoxes(closedBoxes + 1);
    
    if (closedBoxes + 1 === remainingPopups) {
      setShowMessage(true);
    }
};

export const handleMouseDown = (e: React.MouseEvent | React.TouchEvent, box: PopupBoxType, popupBoxes: PopupBoxType[], setPopupBoxes: (boxes: PopupBoxType[]) => void) => {
    const isTouchEvent = 'touches' in e;
    const startX = isTouchEvent ? e.touches[0].clientX : e.clientX;
    const startY = isTouchEvent ? e.touches[0].clientY : e.clientY;
    const initialTop = box.top;
    const initialLeft = box.left;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientY = isTouchEvent ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
      const clientX = isTouchEvent ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;

      const newTop = initialTop + (clientY - startY) / window.innerHeight * 100;
      const newLeft = initialLeft + (clientX - startX) / window.innerWidth * 100;

      setPopupBoxes(
        popupBoxes.map(b => (b.id === box.id ? { ...b, top: newTop, left: newLeft } : b))
      );
    };

    const handleEnd = () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);
};

const decodeLink = (encodedData: string) => {
    const decodedData = atob(encodedData);
    return JSON.parse(decodeURIComponent(decodedData));
};

export const getURLEncodedData = (location: Location, setDecodedSender: (sender: string) => void, setDisplayMessage: (message: string) => void, setPopupCount: (popupCount: string) => void, setRemainingPopups: (remainingPopups: number) => void, setThemeId: (themeId: string) => void, setDelay: (delay: string) => void, setQuestions: (questions: Question[]) => void) => {
    const pathParts = location.pathname.split('/');
    const encodedData = pathParts[pathParts.length - 1];

    if (encodedData) {
      const decodedData = decodeLink(encodedData);
      setDecodedSender(decodedData.sender || '');
      setDisplayMessage(decodedData.message || '');
      setPopupCount(decodedData.popupCount);
      setRemainingPopups(decodedData.popupCount);
      setThemeId(decodedData.themeId);
      setDelay(decodedData.delay);
      setQuestions(decodedData.questions);
    }
};

export const celebrate = (setNumberOfPieces: (numberOfPieces: number) => void, setConfettiActive: (confettiActive: boolean) => void) => {
    const audio = new Audio('/sounds/congratulations.mp3');
    audio.play();
    setTimeout(() => {
    setNumberOfPieces(0);
    setTimeout(() => {
        setConfettiActive(false);
    }, 3000);
    }, 2000);
}
