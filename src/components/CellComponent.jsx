import { useBoard } from '../context/BoardContext';

const CellComponent = ({ row, cell }) => {
  const { playFn, board } = useBoard();
  return (
    <span
      onClick={() => playFn(row, cell)}
      style={{
        width: '89px',
        height: '89px',
        border: '1px solid lightgray',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 'xxx-large',
        textTransform: 'capitalize',
        cursor: 'pointer',
        fontWeight: 900,
      }}>
      {board[row][cell]}
    </span>
  )
};

export default CellComponent;