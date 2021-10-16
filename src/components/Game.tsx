import { Component } from "react";
import Board from "./Board";
import "../index.css";

interface HistoryInterface {
  squares: string[];
  clicked: number;
}

interface GameState {
  history: HistoryInterface[];
  stepNumber: number;
  xIsNext: boolean;
  sortAscending: boolean;
}

export default class Game extends Component<any, GameState> {
  state: GameState = {
    history: [{
      squares: Array(9).fill(null),
      clicked: -1,
    }],
    stepNumber: 0,
    xIsNext: true,
    sortAscending: true,
  };

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();  // copy
    const winner = calculateWinner(squares);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares,
        clicked: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  handleToggleClick() {
    this.setState({
      sortAscending: !this.state.sortAscending,
    });
  }

  getSquareColumn(i: number) {
    return (i % 3) + 1;
  }

  getSquareRow(i: number) {
    return Math.floor(i / 3) + 1;
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    let history = this.state.history;
    let stepNumber = this.state.stepNumber;
    let gameStartIdx = 0;
    if (!this.state.sortAscending) {
      history = history.slice().reverse();
      stepNumber = history.length - 1 - stepNumber;
      gameStartIdx = history.length - 1;
    }
    const current = history[stepNumber];

    const moves = history.map((step, move) => {
      const col = this.getSquareColumn(step.clicked);
      const row = this.getSquareRow(step.clicked);
      const moveLabel = this.state.sortAscending ? move : history.length - 1 - move;
      const desc = move !== gameStartIdx ?
        `Go to move # ${moveLabel} (${col},${row})` :
        "Go to game start";
      const moveButtonClass = move === stepNumber ? "move-button-selected" : "";
      return (
        <li key={moveLabel}>
          <button
            onClick={() => this.jumpTo(moveLabel)}
            className={moveButtonClass}
          >
            {desc}
          </button>
        </li>
      );
    });

    const winner = calculateWinner(current.squares);
    let status;
    let winnerSquares: number[] = [];
    if (winner) {
      status = `Winner: ${winner.winner}`;
      winnerSquares = winner.squares;
    } else if (checkDraw(current.squares)) {
      status = "Winner: Draw game"
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    const sortButtonText = `Sort ${this.state.sortAscending ? "Descending" : "Ascending"}`;
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winner={winnerSquares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul>{moves}</ul>
          <div>
            <button onClick={() => this.handleToggleClick()}>{sortButtonText}</button>
          </div>
        </div>
      </div>
    );
  }
}

interface WinnerInterface {
  winner: string;
  squares: number[];
}

function calculateWinner(squares: string[]) : WinnerInterface | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        squares: [a, b, c],
      };
    }
  }
  return null;
}

function checkDraw(squares: string[]) {
  for (const square of squares) {
    if (square === null) {
      return false;
    }
  }
  return true;
}
