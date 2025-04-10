import { gameState } from '../App';

export default function GameBoard({
  onSelectSquare /* activePlayerSymbol */,
  gameboard
}) {
  return (
    <ol id='game-board'>
      {gameboard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={
                    () => onSelectSquare(rowIndex, colIndex)
                    /* () => handleSelectCell(rowIndex, colIndex) */
                  }
                  // disabled={!!gameboard[rowIndex][colIndex]}
                  disabled={!!playerSymbol || gameState['gameOver']}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
