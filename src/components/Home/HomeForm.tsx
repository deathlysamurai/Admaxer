import { useState, useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { Theme, themes } from '../../data/themes';
import { handleDelayInput, handlePopupCountInput, handleSubmit } from './Functions/HomeFormFuncs';
import { Template } from '../../data/templates';
import FormSubmit from './FormSubmit';
import FormCustomization from './FormCustomization';
import { Question } from '../../data/interfaces';
import { MAX_QUESTIONS } from '../../constants';
import { generateLink } from './Functions/FormSubmitFuncs';

interface HomeFormProps {
    isLimited: boolean;
    setError: React.Dispatch<React.SetStateAction<string>>;
    checkLimit: () => boolean;
    timeUntilReset: number;
}

const HomeForm: React.FC<HomeFormProps> = ({ isLimited, setError, checkLimit, timeUntilReset }) => {
    const [sender, setSender] = useState('');
    const [message, setMessage] = useState('');
    const [popupCount, setPopupCount] = useState(5);
    const [delay, setDelay] = useState(5);
    const [showQR, setShowQR] = useState(false);
    const [popupCountInput, setPopupCountInput] = useState('5');
    const [delayInput, setDelayInput] = useState('5');
    const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);
    const [questions, setQuestions] = useState<Question[]>([{id: '1', question: 'What is 1 + 1?', answer: '2', options: ['0', '2', '11']}]);
    const [optionWarnings, setOptionWarnings] = useState<boolean[]>(Array(MAX_QUESTIONS).fill(false));
    const location = useLocation();

    useEffect(() => {
        if (location.state?.template) {
          const template = location.state.template as Template;
          setMessage(template.message);
        }
    }, [location.state]);

    useEffect(() => {
        handlePopupCountInput(popupCountInput, setPopupCount);
      }, [popupCountInput]);
    
      useEffect(() => {
        handleDelayInput(delayInput, setDelay);
      }, [delayInput]);

      const handleTestLink = () => {
        const link = generateLink(sender, message, popupCount, selectedTheme, delay, questions);
        window.open(link, '_blank');
    };

    return(
        <>
        {!isLimited ? (
            <>
              <div className="text-center mb-6">
                <Link
                  to="/templates"
                  className="text-purple-600 hover:text-purple-800 transition-colors duration-200 inline-block"
                >
                  Browse Message Templates
                </Link>
              </div>

              <form onSubmit={(e) => handleSubmit(e, isLimited, setError, checkLimit, popupCountInput, setPopupCount, setShowQR, optionWarnings)} className="space-y-6">
                <FormCustomization sender={sender} setSender={setSender} message={message} setMessage={setMessage} selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} popupCountInput={popupCountInput} setPopupCountInput={setPopupCountInput} delayInput={delayInput} setDelayInput={setDelayInput} questions={questions} setQuestions={setQuestions} optionWarnings={optionWarnings} setOptionWarnings={setOptionWarnings} />

                <div className="flex justify-end">
                  {showQR && (
                    <button 
                      className="bg-white border-2 border-purple-500 text-purple-900 px-4 py-2 rounded-md hover:bg-purple-200 transition-all duration-300 mr-2" 
                      type="button"
                      onClick={handleTestLink}
                    >
                      Test Link
                    </button>
                  )}
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                    type="submit"
                  >
                    Generate Prank Link
                  </button>
                </div>
              </form>

              <FormSubmit showQR={showQR} sender={sender} message={message} popupCount={popupCount} selectedTheme={selectedTheme} delay={delay} questions={questions} />
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">You've reached the message limit for this time period.</p>
              <p className="text-sm text-gray-500">Please try again in {timeUntilReset} seconds.</p>
            </div>
          )}
        </>
    );
};

export default HomeForm;