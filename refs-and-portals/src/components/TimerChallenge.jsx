import { useRef, useState } from 'react';
import ResultModal from './ResultModal';

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  const handleStart = () => {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.showModal();
      setTimerStarted(false);
    }, targetTime * 1000);
    setTimerStarted(true);
  };

  const handleStop = () => {
    clearTimeout(timer.current);
    setTimerStarted(false);
  };

  return (
    <>
      <ResultModal targetTime={targetTime} result='lost' ref={dialog} />

      <section className='challenge'>
        <h2>{title}</h2>
        <p className='challenge-time'>
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button
            type='button'
            onClick={timerStarted ? handleStop : handleStart}
          >
            {timerStarted ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className=''>
          {timerStarted ? 'Timer is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}
