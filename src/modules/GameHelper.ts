interface WinnerInterface {
  winner: string;
  winningPos: number[];
}

const WinningLines= [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function checkWinner(squares: string[]) : WinnerInterface | null {
  for (let i = 0; i < WinningLines.length; i++) {
    const [a, b, c] = WinningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winningPos: [a, b, c],
      };
    }
  }
  return null;
}

export function checkDraw(squares: string[]) {
  for (const square of squares) {
    if (square === null) {
      return false;
    }
  }
  return true;
}

export function getNextPlayer(xIsNext: boolean) {
  return xIsNext ? "X" : "O";
}

export function getSquareColumn(i: number) {
  return (i % 3) + 1;
}

export function getSquareRow(i: number) {
  return Math.floor(i / 3) + 1;
}
