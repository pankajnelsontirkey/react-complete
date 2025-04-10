import { gameState } from '../App';

const checkWinCondition = (array_3) => {
  if (array_3.every((val) => val === 'X')) {
    gameState['gameOver'] = true;
    gameState['winner'] = 'X';
  }
  if (array_3.every((val) => val === 'O')) {
    gameState['gameOver'] = true;
    gameState['winner'] = 'O';
  }
  return gameState['gameOver']; // returning true to satisfy boolean condition in some
};

const checkLine = (line) => {
  line.some((cell) => {
    // Array.some() needs a boolean return
    return checkWinCondition(cell);
  });
};

const checkMovesAvailable = (board) => {
  if (gameState['gameOver']) {
    return;
  }

  const flattenedBoard = board.flat();

  if (flattenedBoard.some((cell) => cell === null)) {
    return;
  } else {
    gameState['gameOver'] = true;
    gameState['winner'] = 'draw';
  }
};

/* used to get values in columns */
const transposeBoard = (board) =>
  board.map((row, r) => row.map((col, c) => board[c][r]));

const getDiagonals = (board) => {
  let ld = [],
    rd = [],
    m = board.length,
    i = 0;

  while (i < m) {
    ld.push(board[i][i]);
    rd.push(board[i][m - i - 1]);
    i++;
  }

  return [ld, rd];
};

export const runGameLoop = (board) => {
  checkLine(board); // rows
  checkLine(transposeBoard(board)); //cols
  checkLine(getDiagonals(board)); // diags
  checkMovesAvailable(board); // empty squares
};
