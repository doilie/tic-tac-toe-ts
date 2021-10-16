import Square from "./Square";

interface BoardInterface {
  squares: string[];
  winner: number[];
  onClick: (index: number) => void;
}

const Board = (props: BoardInterface) => {
  const numRows = 3;
  const numCols = 3;
  const rows = [];
  const winner = props.winner || [];
  for (let row = 0; row < numRows; row++) {
    const cols = [];
    for (let col = 0; col < numCols; col++) {
      const i = (row * numCols) + col;
      const isWinner = winner.indexOf(i) !== -1;
      cols.push(
        <Square
          value={props.squares[i]}
          onClick={() => props.onClick(i)}
          isWinner={isWinner}
        />);
    }
    rows.push(<div className="board-row">{cols}</div>);
  }
  return (<div>{rows}</div>);
}

export default Board;