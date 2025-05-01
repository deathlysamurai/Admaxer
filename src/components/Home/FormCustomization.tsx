import { useState } from 'react';
import PopupCustomization from '../../components/Home/PopupCustomization';
import DelayTimerCustomization from '../../components/Home/DelayTimerCustomization';
import { Theme } from '../../data/themes';
import QuestionsCustomization from './QuestionsCustomization';
import { Question } from '../../data/interfaces';

interface FormCustomizationProps {
    sender: string;
    setSender: React.Dispatch<React.SetStateAction<string>>;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    selectedTheme: Theme;
    setSelectedTheme: React.Dispatch<React.SetStateAction<Theme>>;
    popupCountInput: string;
    setPopupCountInput: React.Dispatch<React.SetStateAction<string>>;
    delayInput: string;
    setDelayInput: React.Dispatch<React.SetStateAction<string>>;
    questions: Question[];
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
    optionWarnings: boolean[];
    setOptionWarnings: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const FormCustomization: React.FC<FormCustomizationProps> = ({sender, setSender, message, setMessage, selectedTheme, setSelectedTheme, popupCountInput, setPopupCountInput, delayInput, setDelayInput, questions, setQuestions, optionWarnings, setOptionWarnings}) => {
    const [showPopupCustomization, setShowPopupCustomization] = useState(false);
    const [showDelayTimerCustomization, setShowDelayTimerCustomization] = useState(false);
    const [showQuestionsCustomization, setShowQuestionsCustomization] = useState(false);

    return (
        <>
            <div>
                <label htmlFor="sender" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400"
                type="text" id="sender" value={sender} onChange={(e) => setSender(e.target.value)} placeholder="Enter your name" required
                />
            </div>
            
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <textarea className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400 resize-none"
                id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Write your prank message here..." required
                />
            </div>

            <div className="flex justify-start mb-4">
                <button className="bg-white border-2 border-gradient-to-r from-purple-600 to-pink-600 py-3 px-6 rounded-lg text-transparent bg-clip-text customization-button"
                type="button" onClick={() => setShowPopupCustomization(!showPopupCustomization)}
                >
                Customize Popups
                </button>
            </div>

            {showPopupCustomization && (
                <PopupCustomization selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} popupCountInput={popupCountInput} setPopupCountInput={setPopupCountInput} />
            )}

            <div className="flex justify-start mb-4">
                <button className="bg-white border-2 border-gradient-to-r from-purple-600 to-pink-600 py-3 px-6 rounded-lg text-transparent bg-clip-text customization-button"
                type="button" onClick={() => setShowDelayTimerCustomization(!showDelayTimerCustomization)}
                >
                Customize Delay
                </button>
            </div>

            {showDelayTimerCustomization && (
                <DelayTimerCustomization delayInput={delayInput} setDelayInput={setDelayInput} />
            )}

            <div className="flex justify-start mb-4">
                <button className="bg-white border-2 border-gradient-to-r from-purple-600 to-pink-600 py-3 px-6 rounded-lg text-transparent bg-clip-text customization-button"
                type="button" onClick={() => setShowQuestionsCustomization(!showQuestionsCustomization)}
                >
                Customize Questions
                </button>
            </div>

            {showQuestionsCustomization && (
                <QuestionsCustomization questions={questions} setQuestions={setQuestions} optionWarnings={optionWarnings} setOptionWarnings={setOptionWarnings} />
            )}
        </>
    );
};

export default FormCustomization;