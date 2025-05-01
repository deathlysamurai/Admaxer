import { MAX_POPUPS, MAX_DELAY } from '../../../constants';

export const handleSubmit = (e: React.FormEvent, isLimited: boolean, setError: React.Dispatch<React.SetStateAction<string>>, checkLimit: () => boolean, popupCountInput: string, setPopupCount: React.Dispatch<React.SetStateAction<number>>, setShowQR: React.Dispatch<React.SetStateAction<boolean>>, optionWarnings: boolean[]) => {
    e.preventDefault();
    if (isLimited) {
      setError(`Rate limit exceeded. Please try again in a few minutes.`);
      return;
    }
    if (!checkLimit()) {
      setError(`Rate limit exceeded. Please try again in a few minutes.`);
      return;
    }
    if (optionWarnings.some(warning => warning)) {
      setError('Please ensure all questions have one of the options as the answer.');
      return;
    }
    const popupCount = Math.min(parseInt(popupCountInput), MAX_POPUPS);
    setPopupCount(popupCount);
    setShowQR(true);
    setError('');
};

export const handlePopupCountInput = (popupCountInput: string, setPopupCount: React.Dispatch<React.SetStateAction<number>>) => {
    const newCount = Math.min(parseInt(popupCountInput), MAX_POPUPS);
    setPopupCount(newCount);
}

export const handleDelayInput = (delayInput: string, setDelay: React.Dispatch<React.SetStateAction<number>>) => {
    const newCount = Math.min(parseInt(delayInput), MAX_DELAY);
    setDelay(newCount);
}