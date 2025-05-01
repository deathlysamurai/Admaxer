import { useState } from "react";
import { Question } from "../../data/interfaces";

interface QuestionsContainerProps {
    theme: any;
    questions: Question[];
    setAskQuestions: (askQuestions: boolean) => void;
}

const QuestionsContainer: React.FC<QuestionsContainerProps> = ({ theme, questions, setAskQuestions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleOptionClick = (e: React.MouseEvent<HTMLDivElement>, option: string) => {
        e.preventDefault();
        console.log(option);
        const target = e.target as HTMLDivElement;
        const correctAnswer = questions[currentQuestionIndex].answer;
        if (option === correctAnswer) {
            const audio = new Audio('/sounds/correct.mp3');
            audio.play().catch(error => {
                console.error('Error playing sound:', error);
            });
            target.classList.add("border-green-500");
            setTimeout(() => {
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    const elements = document.querySelectorAll(".option-box");
                    elements.forEach((element) => {
                        element.classList.remove("border-green-500");
                        element.classList.remove("border-red-500");
                    });
                } else {
                    setAskQuestions(false);
                }
            }, 500);
        } else {
            const audio = new Audio('/sounds/buzzer.mp3');
            audio.play().catch(error => {
                console.error('Error playing sound:', error);
            });
            target.classList.add("border-red-500");
        }
    };
    
    return (
        <div className={`rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full text-center mx-4 mt-32 md:mt-24 ${theme.backgroundColor} ${theme.borderColor}`}>
          <div className={`text-2xl font-bold ${theme.textColor}`}>{questions[currentQuestionIndex].question}</div>
          <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
            {questions[currentQuestionIndex].options.map((option, index) => 
                <div className={`option-box w-full px-4 py-2 border border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300 cursor-pointer ${theme.textColor}`}
                    key={`option-${index}`}
                    onClick={(e) => handleOptionClick(e, option)}
                >
                    {option === '' ? '\u00A0' : option}
                </div>
            )}
          </div>
        </div>
    );
};

export default QuestionsContainer;
