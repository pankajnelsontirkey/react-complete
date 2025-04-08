import { useState } from 'react';

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <li>
      <span className='player'>
        {!isEditing ? (
          <span className='player-name'>{name}</span>
        ) : (
          <input type='text' required />
        )}
        <span className='player-symbol'>{symbol}</span>
        <button onClick={handleEditClick}>Edit</button>
      </span>
    </li>
  );
}
