import { useState } from 'react';

export default function Player() {
  const [playerName, setPlayerName] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = ({ target: { value } }) => {
    setSubmitted(false);
    setPlayerName(value);
  };

  const handleClick = () => {
    setSubmitted(true);
  };

  return (
    <section id='player'>
      <h2>Welcome {submitted ? playerName : 'unknown entity'}</h2>
      <p>
        <input type='text' onChange={handleChange} value={playerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
