import { useState } from 'react';

import Answers from './Answers';
import QuestionTimer from './QuestionTimer';

export default function Question({
  questionText,
  answers,
  onSelectAnswer,
  onSkipAnswer
}) {
  const [answer, setAnswer] = useState({ selectedAnswer: '', isCorrect: null });

  let timer = 5000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  const handleSelectAnswer = (selectedAnswer) => {
    setAnswer({ selectedAnswer, isCorrect: null });

    setTimeout(() => {
      setAnswer({
        selectedAnswer,
        isCorrect: answers[0] === selectedAnswer
      });
      setTimeout(() => {
        onSelectAnswer(selectedAnswer);
      }, 2000);
    }, 1000);
  };

  let answerState = '';

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <>
      <div id='question'>
        <QuestionTimer
          key={timer}
          timeout={timer}
          onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
          mode={answerState}
        />

        <h2>{questionText}</h2>
        <Answers
          answers={answers}
          answerState={answerState}
          selectedAnswer={answer['selectedAnswer']}
          onSelect={handleSelectAnswer}
        />
      </div>
    </>
  );
}
