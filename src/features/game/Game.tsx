import Board from "./Board";
import {useSelector} from "react-redux";
import {selectGameStatus, selectSquares, selectWinningPos, addTurn, GameStatusInterface} from "./gameSlice";
import {useAppDispatch} from "../../app/store";
import {getNextPlayer} from "../../modules/GameHelper";
import {History} from "./History";

export const Game = () => {
  const squares = useSelector(selectSquares);
  const status = buildGameStatus(useSelector(selectGameStatus));
  const winningPos = useSelector(selectWinningPos);

  const dispatch = useAppDispatch();

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          onClick={(i) => dispatch(addTurn(i))}
          winner={winningPos}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div><span>&nbsp;</span></div>
        <History />
      </div>
    </div>
);
};

const buildGameStatus = (gameStatus: GameStatusInterface) => {
  if (gameStatus.gameOver) {
    return `Winner: ${gameStatus.winner !== null ? gameStatus.winner : "Draw Game"}`;
  } else {
    return `Next player: ${getNextPlayer(gameStatus.xIsNext)}`;
  }
};
