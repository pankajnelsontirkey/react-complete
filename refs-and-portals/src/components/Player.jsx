import { useRef, useState } from 'react';

export default function Player() {
  const playerName = useRef();
  const [inputPlayerName, setInputPlayerName] = useState(null);

  const handleClick = () => {
    setInputPlayerName(playerName.current.value);
  };

  return (
    <section id='player'>
      <h2>Welcome {inputPlayerName ?? 'unknown entity'}</h2>
      <p>
        <input type='text' ref={playerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
