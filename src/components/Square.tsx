interface SquareInterface {
  value: string;
  isWinner: boolean;
  onClick: () => void;
}

const Square = (props: SquareInterface) => {
  const className = `square${props.isWinner ? " square-highlight" : ""}`;
  return (
    <button
      className={className}
      onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;