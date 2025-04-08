const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

export default function GameBoard({
  onSelectSquare /* activePlayerSymbol */,
  turns
}) {
  // const [gameboard, setGameboard] = useState(initialGameBoard);

  // const handleSelectCell = (rowIndex, colIndex) => {
  //   setGameboard((prevGameboard) => {
  //     const updatedBoard = [
  //       ...prevGameboard.map((innerArray) => [...innerArray])
  //     ];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;

  //     return updatedBoard;
  //   });

  //   onSelectSquare();
  // };

  let gameboard = initialGameBoard;

  for (const turn of turns) {
    const {
      square: { row, col },
      player
    } = turn;

    gameboard[row][col] = player;
  }

  return (
    <ol id='game-board'>
      {gameboard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={
                    () =>
                      onSelectSquare(
                        rowIndex,
                        colIndex
                      ) /* () => handleSelectCell(rowIndex, colIndex) */
                  }
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
