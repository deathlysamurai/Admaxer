import { QRCodeSVG } from 'qrcode.react';
import { generateLink, generateShareableLinks, handleCopyLink } from './Functions/FormSubmitFuncs';
import { Theme } from '../../data/themes';
import { Question } from '../../data/interfaces';

interface FormSubmitProps {
    showQR: boolean;
    sender: string;
    message: string;
    popupCount: number;
    selectedTheme: Theme;
    delay: number;
    questions: Question[];
}

const FormSubmit: React.FC<FormSubmitProps> = ({showQR, sender, message, popupCount, selectedTheme, delay, questions}) => {
    return(
        <>
            {showQR && (
                <div className="mt-8 text-center">
                  <QRCodeSVG value={generateLink(sender, message, popupCount, selectedTheme, delay, questions)} size={200} className="mx-auto" />
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Share this link with your friend:</p>
                    <div className="w-full px-4 py-2 rounded-lg border-2 border-purple-200 bg-white text-gray-800 text-sm cursor-pointer break-words"
                      onClick={() => handleCopyLink(sender, message, popupCount, selectedTheme, delay, questions)}
                      onTouchStart={() => handleCopyLink(sender, message, popupCount, selectedTheme, delay, questions)} 
                    >
                      {generateLink(sender, message, popupCount, selectedTheme, delay, questions)}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Share on:</p>
                    <div className="flex justify-center space-x-4">
                      <a href={generateShareableLinks(generateLink(sender, message, popupCount, selectedTheme, delay, questions)).facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook</a>
                      <a href={generateShareableLinks(generateLink(sender, message, popupCount, selectedTheme, delay, questions)).twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Twitter</a>
                      <a href={generateShareableLinks(generateLink(sender, message, popupCount, selectedTheme, delay, questions)).whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">WhatsApp</a>
                    </div>
                  </div>
                </div>
              )}
        </>
    );
};

export default FormSubmit;