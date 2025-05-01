import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MAX_POPUPS } from '../constants';
import { themes } from '../data/themes';
import PopupBox from '../components/MessageView/PopupBox';
import ProgressBar from '../components/MessageView/ProgressBar';
import MessageDisplay from '../components/MessageView/MessageDisplay';
import Header from '../components/MessageView/Header';
import { celebrate, createPopupBoxes, getURLEncodedData, handleCloseBox, handleMouseDown, setupGoogleAds } from '../components/MessageView/MessageViewFuncs';
import DelayBar from '../components/MessageView/DelayBar';
import Confetti from 'react-confetti';
import { Question } from '../data/interfaces';
import QuestionsContainer from '../components/MessageView/QuestionsContainer';

export interface PopupBoxType {
  id: number;
  top: number;
  left: number;
  closed: boolean;
}

const MessageView: React.FC = () => {
  const location = useLocation();
  const [popupCount, setPopupCount] = useState('5');
  const [themeId, setThemeId] = useState('1');
  const [delay, setDelay] = useState('5');
  const [remainingPopups, setRemainingPopups] = useState(Math.min(parseInt(popupCount || '5'), MAX_POPUPS));
  const [showMessage, setShowMessage] = useState(false);
  const [popupBoxes, setPopupBoxes] = useState<PopupBoxType[]>([]);
  const [closedBoxes, setClosedBoxes] = useState(0);
  const [decodedSender, setDecodedSender] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');
  const [delayActive, setDelayActive] = useState(false);
  const [confettiActive, setConfettiActive] = useState(true);
  const [numberOfPieces, setNumberOfPieces] = useState(200);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [askQuestions, setAskQuestions] = useState(false);
  const [userReady, setUserReady] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<{ top: number; left: number }>({ top: 50, left: 50 });
  const [isMoving, setIsMoving] = useState(false);
  const theme = themes.find(t => t.id === themeId) || themes[0];
  const totalProgress = Math.round((closedBoxes / remainingPopups) * 100);

  useEffect(() => {
    return setupGoogleAds();
  }, []);

  useEffect(() => {
    if (!delayActive && userReady) {
      setAskQuestions(true);
    }
  }, [delayActive, userReady]);

  useEffect(() => {
    if (!delayActive && !askQuestions && userReady) {
      return createPopupBoxes(popupBoxes, remainingPopups, setPopupBoxes);
    }
  }, [popupBoxes, remainingPopups, delayActive, askQuestions, userReady]);

  useEffect(() => {
    getURLEncodedData(location, setDecodedSender, setDisplayMessage, setPopupCount, setRemainingPopups, setThemeId, setDelay, setQuestions);
  }, [location]);

  useEffect(() => {
    if (showMessage) {
      celebrate(setNumberOfPieces, setConfettiActive);
    }
  }, [showMessage]);

  const moveButtonRandomly = () => {
    const randomX = Math.max(Math.random() * 80, 25);
    const randomY = Math.max(Math.random() * 80, 25);
    setButtonPosition({ top: randomY, left: randomX });
  };

const startMovingButton = () => {
  if (!isMoving) {
    setIsMoving(true);
    const interval = setInterval(moveButtonRandomly, 500);

    setTimeout(() => {
        clearInterval(interval);
        setIsMoving(false);
    }, 3000);
  }
};

useEffect(() => {
  setTimeout(() => {
    startMovingButton();
  }, 300);
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-4 left-0 right-0 px-4">
        <div className="max-w-md mx-auto">
          <Header />
          <DelayBar delay={parseInt(delay)} delayActive={delayActive} setDelayActive={setDelayActive} theme={theme} askQuestions={askQuestions} />
          <ProgressBar delayActive={delayActive} totalProgress={totalProgress} closedBoxes={closedBoxes} remainingPopups={remainingPopups} theme={theme} askQuestions={askQuestions} userReady={userReady} />
        </div>
      </div>

      {!showMessage && (
        !askQuestions ? (
          userReady ? (
            <div className={`rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full text-center mx-4 mt-32 md:mt-24 ${theme.backgroundColor} ${theme.borderColor}`}>
              <h2 className={`text-xl font-semibold mb-4 ${theme.textColor}`}>You've received a message!</h2>
              <p className={`${theme.textColor}`}>From: {decodedSender}</p>
            </div>
          ) : (
            <button className={`bg-white border-2 border-purple-500 text-purple-900 px-4 py-2 rounded-md hover:bg-purple-200 transition-all duration-300`} 
              onClick={() => {setUserReady(true); setDelayActive(true);}}
              style={{
                position: 'absolute',
                top: `calc(${buttonPosition.top}% - 20px)`,
                left: `calc(${buttonPosition.left}% - 40px)`,
            }}
            >
                Ready?
            </button>
          )
        ) : (
          <QuestionsContainer theme={theme} questions={questions} setAskQuestions={setAskQuestions}/>
        )
      )}

      {popupBoxes.map((box) => (
        <PopupBox key={box.id} box={box} theme={theme} onClose={() => handleCloseBox(box.id, theme, popupBoxes, setPopupBoxes, closedBoxes, setClosedBoxes, setShowMessage, remainingPopups)} onMouseDown={(e) => handleMouseDown(e, box, popupBoxes, setPopupBoxes)} />
      ))}

      <MessageDisplay showMessage={showMessage} decodedSender={decodedSender} displayMessage={displayMessage} theme={theme} />
      {showMessage && confettiActive && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={numberOfPieces} />}
    </div>
  );
};

export default MessageView; 