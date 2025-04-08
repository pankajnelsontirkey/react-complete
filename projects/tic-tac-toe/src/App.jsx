import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import Player from './components/Player';

const getDerivedActivePlayer = (gameTurns) => {
  let currentPlayer = 'X';

  if (gameTurns?.length && gameTurns[0]?.player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');

  const currentPlayer = getDerivedActivePlayer(gameTurns);

  const handleSwitchPlayerTurn = (rowIndex, colIndex) => {
    // setActivePlayer((currentPlayer) => (currentPlayer === 'X' ? 'O' : 'X'));

    setGameTurns((prevTurns) => {
      let currentPlayer = getDerivedActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];

      return updatedTurns;
    });
  };

  return (
    <>
      <main>
        <div id='game-container'>
          <ol id='players' className='highlight-player'>
            <Player
              defaultName={'Player 1'}
              symbol={'X'}
              isActive={currentPlayer === 'X'}
            />
            <Player
              defaultName={'Player 2'}
              symbol={'O'}
              isActive={currentPlayer === 'O'}
            />
          </ol>
          <GameBoard
            onSelectSquare={handleSwitchPlayerTurn}
            activePlayerSymbol={currentPlayer}
            turns={gameTurns}
          />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
