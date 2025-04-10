import { useState } from 'react';

import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import Log from './components/Log';
import Player from './components/Player';
import { runGameLoop } from './utils/gameUtils';
import { GAME_STATE, INITIAL_GAME_BOARD } from './utils/gameConstants';

const getDerivedActivePlayer = (gameTurns) => {
  let currentPlayer = 'X';

  if (gameTurns?.length && gameTurns[0]?.player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const currentPlayer = getDerivedActivePlayer(gameTurns);

  let gameboard = INITIAL_GAME_BOARD.map((_, r) =>
    row.map((__, c) => INITIAL_GAME_BOARD[r][c])
  );

  for (const turn of gameTurns) {
    const {
      square: { row, col },
      player
    } = turn;

    gameboard[row][col] = player;
  }

  if (gameTurns.length) {
    runGameLoop(gameboard);
  }

  const handleSwitchPlayerTurn = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      let currentPlayer = getDerivedActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];

      return updatedTurns;
    });
  };

  const handleResetGame = () => {
    gameboard = INITIAL_GAME_BOARD;
    GAME_STATE['winner'] = null;
    GAME_STATE['gameOver'] = false;
    setGameTurns([]);
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
          {GAME_STATE['winner'] && (
            <GameOver
              winner={GAME_STATE['winner']}
              onRematch={handleResetGame}
            />
          )}
          <GameBoard
            onSelectSquare={handleSwitchPlayerTurn}
            activePlayerSymbol={currentPlayer}
            gameboard={gameboard}
          />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
