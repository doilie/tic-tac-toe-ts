import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {checkDraw, checkWinner, getNextPlayer} from "../../modules/GameHelper";

interface TurnInterface {
  squares: string[];
  clicked: number | null;
}

interface TurnStatusInterface {
  turns: TurnInterface[];
  turnNumber: number;
  sortAscending: boolean;
}

export interface GameStatusInterface {
  squares: string[];
  xIsNext: boolean;
  gameOver: boolean;
  winner: string | null;
  winningPos: number[];
}

interface GameSliceState {
  gameStatus: GameStatusInterface;
  turnStatus: TurnStatusInterface;
}

interface GameState {
  game: GameSliceState;
}

const initialSquares = Array(9).fill(null);

const initialState: GameSliceState = {
  gameStatus: {
    squares: initialSquares,
    xIsNext: true,
    gameOver: false,
    winner: null,
    winningPos: [],
  },
  turnStatus: {
    turns: [
      {
        squares: initialSquares,
        clicked: null,
      },
    ],
    turnNumber: 0,
    sortAscending: true,
  },
};

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addTurn: (state: GameSliceState, action: PayloadAction<number>) => {
      const squarePos = action.payload;

      if (state.gameStatus.squares[squarePos] === null && !state.gameStatus.gameOver) {
        const squares = state.gameStatus.squares.slice();
        squares[squarePos] = getNextPlayer(state.gameStatus.xIsNext);

        const winnerResult = checkWinner(squares);
        const gameOver = winnerResult !== null || checkDraw(squares);

        let winner = null;
        let winningPos: number[] = [];
        if (winnerResult !== null) {
          winner = winnerResult.winner;
          winningPos = winnerResult.winningPos;
        }

        const turns = state.turnStatus.turns.slice(0, state.turnStatus.turnNumber + 1).concat([{
          squares,
          clicked: squarePos,
        }]);

        return {
          gameStatus: {
            squares,
            xIsNext: !state.gameStatus.xIsNext,
            gameOver,
            winner,
            winningPos,
          },
          turnStatus: {
            ...state.turnStatus,
            turns,
            turnNumber: turns.length - 1,
          }
        };
      }
      return state;
    },
    setTurn: (state: GameSliceState, action: PayloadAction<number>) => {
      const turnNumber = action.payload;
      const turns = state.turnStatus.turns;
      const squares = turns[turnNumber].squares;
      return {
        gameStatus: {
          ...state.gameStatus,
          squares,
          xIsNext: (turnNumber % 2) === 0,
        },
        turnStatus: {
          ...state.turnStatus,
          turns: turns.slice(0, turns.length + 1),
          turnNumber,
        }
      };
    },
    toggleTurnsSort: (state: GameSliceState) => {
      return {
        gameStatus: {
          ...state.gameStatus,
        },
        turnStatus: {
          ...state.turnStatus,
          sortAscending: !state.turnStatus.sortAscending,
        },
      };
    },

  },
});

export const { addTurn, setTurn, toggleTurnsSort } = slice.actions;

export const selectSquares = (state: GameState) => state.game.gameStatus.squares;

export const selectWinningPos = (state: GameState) => state.game.gameStatus.winningPos;

export const selectGameStatus = (state: GameState) => state.game.gameStatus;

export const selectTurnStatus = (state: GameState) => state.game.turnStatus;

export const selectTurnSortDirection = (state: GameState) => state.game.turnStatus.sortAscending;


export default slice.reducer;

