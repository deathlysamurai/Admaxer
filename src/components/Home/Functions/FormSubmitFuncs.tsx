import { Question } from "../../../data/interfaces";
import { Theme } from "../../../data/themes";

export const generateLink = (sender: string, message: string, popupCount: number, selectedTheme: Theme, delay: number, questions: Question[]) => {
    const data = { sender: sender, message: message, popupCount: popupCount, themeId: selectedTheme.id, delay: delay, questions: questions };
    const encodedData = btoa(encodeURIComponent(JSON.stringify(data)));
    return `${window.location.origin}${process.env.PUBLIC_URL || ''}/#/fun/${encodedData}`;
};

export const generateShareableLinks = (link: string) => {
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(link)}`,
    };
};

export const handleCopyLink = (sender: string, message: string, popupCount: number, selectedTheme: Theme, delay: number, questions: Question[]) => {
    const link = generateLink(sender, message, popupCount, selectedTheme, delay, questions);
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
};