import { useState } from 'react';

export default function Player({ defaultName, symbol }) {
  const [playerName, setPlayerName] = useState(defaultName);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing((editing) => !editing);
  };

  const handleChange = ({ target: { value } }) => {
    setPlayerName(value);
  };

  const playerNameField = !isEditing ? (
    <span className='player-name'>{playerName}</span>
  ) : (
    <input type='text' required value={playerName} onChange={handleChange} />
  );

  return (
    <li>
      <span className='player'>
        {playerNameField}
        <span className='player-symbol'>{symbol}</span>
        <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
      </span>
    </li>
  );
}
