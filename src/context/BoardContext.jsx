import {
  createContext, useContext, useReducer, useState, useEffect
} from 'react';

const players = {
  CPU: {
    SYM: 'O',
    NAME: 'CPU',
  },
  HUMAN: {
    SYM: 'X',
    NAME: 'You',
  },
};

const emptyBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const BoardContext = createContext(null);

export function BoardProvider({ children }) {
  const [winner, setWinner] = useState(null);
  const [isCPUNext, setIsCPUNext] = useState(false);
  const [board, setBoard] = useState(emptyBoard.map(row => [...row]));
  // const [board, dispatch] = useReducer(
  //   () => {},
  //   [
  //     ['', '', ''],
  //     ['', '', ''],
  //     ['', '', ''],
  //   ]
  // );

  function checkWinner() {
    // check same row
    for (let index = 0; index < board.length; index++) {
      const row = board[index];
      if (row.every((cell) => cell === players?.CPU?.SYM)) {
        setWinner(players?.CPU?.NAME);
        return;
      } else if (row.every((cell) => cell === players?.HUMAN?.SYM)) {
        setWinner(players?.HUMAN?.NAME);
        return;
      }
    }

    // check same column
    for (let i = 0; i < 3; i++) {
      const column = board.map((row) => row[i]);
      if (column.every((cell) => cell === players?.CPU?.SYM)) {
        setWinner(players?.CPU?.NAME);
        return;
      } else if (column.every((cell) => cell === players?.HUMAN?.SYM)) {
        setWinner(players?.HUMAN?.NAME);
        return;
      }
    }

    // check same diagonal
    const diagonal1 = [board[0][0], board[1][1], board[2][2]];
    const diagonal2 = [board[0][2], board[1][1], board[2][0]];
    if (diagonal1.every((cell) => cell === players?.CPU?.SYM)) {
      setWinner(players?.CPU?.NAME);
      return;
    } else if (diagonal1.every((cell) => cell === players?.HUMAN?.SYM)) {
      setWinner(players?.HUMAN?.NAME);
      return;
    } else if (diagonal2.every((cell) => cell === players?.CPU?.SYM)) {
      setWinner(players?.CPU?.NAME);
      return;
    } else if (diagonal2.every((cell) => cell === players?.HUMAN?.SYM)) {
      setWinner(players?.HUMAN?.NAME);
      return;
    } else if (board.flat().every((cell) => cell !== '')) {
      setWinner('draw');
      return;
    } else {
      setWinner(null);
      return;
    }
  }

  function cPUPlay() {
    if (winner) return;

    const cPUMove = getCPUTurn();

    board[cPUMove.arrayIndex][cPUMove.index] = players?.CPU?.SYM;

    setBoard((board) => [...board]);
    checkWinner();
    setIsCPUNext(false);
  }

  function playFn(arrayIndex, index) {
    if (isCPUNext) return;
    if (winner) return;
    board[arrayIndex][index] = players?.HUMAN?.SYM;
    setBoard((board) => [...board]);
    checkWinner();
    setIsCPUNext(true);
  }

  function getCPUTurn() {
    const emptyIndexes = [];
    board.forEach((row, arrayIndex) => {
      row.forEach((cell, index) => {
        if (cell === '') {
          emptyIndexes.push({ arrayIndex, index });
        }
      });
    });

    const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
    return emptyIndexes[randomIndex];
  }

  useEffect(() => {
    if (winner) return;
    if (isCPUNext) {
      setTimeout(cPUPlay, 500);
    } 
  }, [isCPUNext]);

  function playAgainFn() {
    setBoard(emptyBoard.map((row) => [...row]));
    setWinner(null);
    setIsCPUNext(false);
  }

  return (
    <BoardContext.Provider
      value={{
        board,
        winner,
        isCPUNext,
        playFn,
        playAgainFn,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export const useBoard = () => useContext(BoardContext);
