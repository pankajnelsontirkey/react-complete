import { useState } from 'react';

import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import Log from './components/Log';
import Player from './components/Player';
import { GAME_STATE, INITIAL_GAME_BOARD, PLAYERS } from './utils/gameConstants';
import { runGameLoop } from './utils/gameUtils';

const getDerivedActivePlayer = (gameTurns) => {
  let currentPlayer = 'X';

  if (gameTurns?.length && gameTurns[0]?.player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
};

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const currentPlayer = getDerivedActivePlayer(gameTurns);

  let gameboard = INITIAL_GAME_BOARD.map((_, r) =>
    _.map((__, c) => INITIAL_GAME_BOARD[r][c])
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

  const handleSavePlayerName = (symbol, newName) => {
    setPlayers((prev) => ({ ...prev, [symbol]: newName }));
  };

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
              defaultName={players['X']}
              symbol={'X'}
              isActive={currentPlayer === 'X'}
              savePlayer={handleSavePlayerName}
            />
            <Player
              defaultName={players['O']}
              symbol={'O'}
              isActive={currentPlayer === 'O'}
              savePlayer={handleSavePlayerName}
            />
          </ol>
          {GAME_STATE['winner'] && (
            <GameOver
              winner={GAME_STATE['winner']}
              onRematch={handleResetGame}
              players={players}
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
