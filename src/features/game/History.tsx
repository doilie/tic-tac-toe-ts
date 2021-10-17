import {useSelector} from "react-redux";
import {useAppDispatch} from "../../app/store";
import {selectTurnSortDirection, selectTurnStatus, setTurn, toggleTurnsSort} from "./gameSlice";
import {getSquareColumn, getSquareRow} from "../../modules/GameHelper";

export const History = () => {
  const turnStatus = useSelector(selectTurnStatus);
  const sortAscending = useSelector(selectTurnSortDirection);
  const dispatch = useAppDispatch();

  let turns = turnStatus.turns;
  let stepNumber = turnStatus.turnNumber;
  let gameStartIdx = 0;
  let sortButtonDirection = "Descending";

  if (!sortAscending) {
    turns = turns.slice().reverse();
    stepNumber = turns.length - 1 - stepNumber;
    gameStartIdx = turns.length - 1;
    sortButtonDirection = "Ascending";
  }

  const turnsList = turns.map((turn, turnIdx) => {
    const col = getSquareColumn(turn.clicked as number);
    const row = getSquareRow(turn.clicked as number);
    const moveLabel = sortAscending ? turnIdx : turns.length - 1 - turnIdx;
    const desc = turnIdx !== gameStartIdx ?
      `Go to move # ${moveLabel} (${col},${row})` :
      "Go to game start";
    const moveButtonClass = turnIdx === stepNumber ? "move-button-selected" : "";
    return (
      <li key={moveLabel}>
        <button
          onClick={() => dispatch(setTurn(moveLabel))}
          className={moveButtonClass}
        >
          {desc}
        </button>
      </li>
    );
  });

  const sortButtonText = `Sort ${sortButtonDirection}`;

  return (
    <div>
      <div>{turnsList}</div>
      <div><span>&nbsp;</span></div>
      <div>
        <button onClick={() => dispatch(toggleTurnsSort())}>{sortButtonText}</button>
      </div>
    </div>
  );
};


