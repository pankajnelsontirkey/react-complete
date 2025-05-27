import quizCompleteImage from '../assets/quiz-complete.png';

export default function Summary({ questions, userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => questions[index].answers[0] === answer
  );

  console.log(userAnswers, skippedAnswers, correctAnswers);

  const skippedPercent = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );
  const correctPercent = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  );
  const wrongPercent = 100 - skippedPercent - correctPercent;

  return (
    <div id='summary'>
      <img src={quizCompleteImage} alt='Quiz Completed' />
      <h2>Quiz Completed!</h2>
      <div id='summary-stats'>
        <p>
          <span className='number'>{skippedPercent}%</span>
          <span className='text'>Skipped</span>
        </p>
        <p>
          <span className='number'>{correctPercent}%</span>
          <span className='text'>Correct</span>
        </p>
        <p>
          <span className='number'>{wrongPercent}%</span>
          <span className='text'>Wrong</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = 'user-answer';
          if (answer === null) {
            cssClass += ' skipped';
          } else if (answer === questions[index].answers[0]) {
            cssClass += ' correct';
          } else {
            cssClass += ' wrong';
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className='question'>{questions[index].text}</p>
              <p className={cssClass}>{answer ?? 'Skipped'}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
