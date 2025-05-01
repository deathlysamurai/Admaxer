import React, { useEffect, useState } from 'react';
import { MAX_QUESTIONS, MAX_OPTIONS } from '../../constants';
import { Question } from '../../data/interfaces';

interface QuestionsCustomizationProps {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  optionWarnings: boolean[];
  setOptionWarnings: (optionWarnings: boolean[]) => void;
}

const QuestionsCustomization: React.FC<QuestionsCustomizationProps> = ({
  questions,
  setQuestions,
  optionWarnings,
  setOptionWarnings,
}) => {
    const [visibleQuestions, setVisibleQuestions] = useState<boolean[]>(Array(MAX_QUESTIONS).fill(true));

    const toggleVisibility = (index: number) => {
      setVisibleQuestions(visibleQuestions.map((visible, i) => (i === index ? !visible : visible)));
    };

    useEffect(() => {
        setOptionWarnings(questions.map((question) => 
            question.options.length > 0 && !question.options.includes(question.answer)
        ));
    }, [questions]);

    const handleRemoveQuestion = (index: number) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        const reindexedQuestions = updatedQuestions.map((question, newIndex) => ({
            ...question,
            id: (newIndex + 1).toString(),
        }));
        setQuestions(reindexedQuestions);
    };

    const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
        const updatedQuestions = questions.map((question, index) => ({
            ...question,
            options: index === questionIndex ? question.options.filter((_, i) => i !== optionIndex) : question.options,
        }));
        setQuestions(updatedQuestions);
    };

  return (
    <>
        <p className="text-xs text-gray-500 mt-1">
            Max {MAX_QUESTIONS} questions, {MAX_OPTIONS} options per question
        </p>
        {Array.from({ length: MAX_QUESTIONS }).map((_, questionIndex) => ( 
            questions[questionIndex] !== undefined ? (
                <div key={questions[questionIndex].id} className="relative border-b border-gray-200 pb-4">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleRemoveQuestion(questionIndex);
                        }}
                        className="absolute top-0 right-0 text-red-500 hover:text-red-700 focus:outline-none"
                    >
                        X
                    </button>
                    <label htmlFor={`question-${questions[questionIndex].id}`} className="block text-sm font-medium text-gray-700 mb-2">
                        Question {questions[questionIndex].id}
                        <button onClick={(e) => {e.preventDefault(); toggleVisibility(questionIndex)}} className="focus:outline-none ml-2">
                            {visibleQuestions[questionIndex] ? '▲' : '▼'}
                        </button>
                    </label>
                    <div className="space-y-4">
                        <input
                        type="text"
                        value={questions[questionIndex].question}
                        onChange={(e) => setQuestions(questions.map((q, i) => i === questionIndex ? {...q, question: e.target.value} : q))}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${!visibleQuestions[questionIndex] ? 'hidden' : ''}`}
                        required
                        />
                    </div>
                    <label htmlFor={`answer-${questions[questionIndex].id}`} className={`block text-sm font-medium text-gray-700 mb-2 ${!visibleQuestions[questionIndex] ? 'hidden' : ''}`}>
                        Answer {questions[questionIndex].id}
                    </label>
                    <div className={`space-y-4 ${!visibleQuestions[questionIndex] ? 'hidden' : ''}`}>
                        <input
                        type="text"
                        value={questions[questionIndex].answer}
                        onChange={(e) => setQuestions(questions.map((q, i) => i === questionIndex ? {...q, answer: e.target.value} : q))}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                        />
                    </div>
                    <label htmlFor={`options-${questions[questionIndex].id}`} className={`block text-sm font-medium text-gray-700 mb-2 ${!visibleQuestions[questionIndex] ? 'hidden' : ''}`}>
                        Options
                    </label>
                    {optionWarnings[questionIndex] && (
                        <p className={`text-red-500 text-sm ${!visibleQuestions[questionIndex] ? 'hidden' : ''}`}>
                            Answer must be one of the options
                        </p>
                    )}
                    <div className={`w-full mb-2 flex flex-col sm:flex-row sm:items-center gap-2 ${!visibleQuestions[questionIndex] ? 'hidden' : ''}`}>
                        {Array.from({ length: MAX_OPTIONS }).map((_, optionIndex) => ( 
                            questions[questionIndex].options[optionIndex] !== undefined ? (
                                <div key={`option-${questions[questionIndex].id}-${optionIndex}`} className="mb-2 relative">
                                    <button
                                        className="absolute top-0 right-0 text-red-500 hover:text-red-700 focus:outline-none mr-2"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleRemoveOption(questionIndex, optionIndex);
                                        }}
                                    >
                                        X
                                    </button>
                                    <input
                                        type="text"
                                        value={questions[questionIndex].options[optionIndex]}
                                        placeholder={`Option ${optionIndex + 1}`}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        onChange={(e) => setQuestions(questions.map((q, i) => i === questionIndex ? {...q, options: [...q.options.slice(0, optionIndex), e.target.value, ...q.options.slice(optionIndex + 1)]} : q))}
                                    />
                                </div>
                            ) : (
                                <div key={`add-option-${questions[questionIndex].id}-${optionIndex}`} 
                                    className={`mb-2 relative rounded-lg`}
                                    onClick={optionIndex === questions[questionIndex].options.length ? (e) => {
                                        e.preventDefault();
                                        setQuestions(
                                            questions.map((q, i) => {
                                                if (i === questionIndex) {
                                                    const options = q.options
                                                    const answer = q.answer
                                                    const newOptions = [...options, options.length === 0 ? answer : ''];
                                                    return { ...q, options: newOptions };
                                                }
                                                return q;
                                            })
                                        );
                                    } : undefined}
                                >
                                    <input
                                        type="text"
                                        disabled={optionIndex === questions[questionIndex].options.length ? false : true}
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer text-center placeholder-black ${optionIndex === questions[questionIndex].options.length ? 'bg-purple-100 hover:bg-purple-200' : ''}`}
                                        placeholder="Add Option"
                                    />
                                </div>
                            )
                        ))}
                    </div>
                </div>
            ) : (
                <div key={`question-${questionIndex}`} className="mb-2">
                    <button
                        key={`add-question-${questionIndex}`}
                        onClick={(e) => {
                        e.preventDefault();
                        setQuestions([...questions, {id: (questionIndex + 1).toString(), question: '', answer: '', options: []}]);
                        }}
                        className={`w-full px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-purple-600 text-white hover:bg-purple-700`}
                    >
                        Add Question
                    </button>
                </div>
            )
        ))}
    </>
  );
};

export default QuestionsCustomization;