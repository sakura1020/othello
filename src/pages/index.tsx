import { useState } from 'react';
import styles from './index.module.css';
const score_white = [2];
const score_black = [2];
const directions = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];
const judge = (y: number, x: number, board: number[][], turnColor: number) => {
  if (board[y][x] !== 1 && board[y][x] !== 2) {
    for (const direction of directions) {
      if (
        board[y + direction[0]] !== undefined &&
        board[y + direction[0]][x + direction[1]] === 3 - turnColor
      ) {
        for (let i = 1; i < 8; i++) {
          if (
            board[y + direction[0] * i] !== undefined &&
            board[y + direction[0] * i][x + direction[1] * i] === 3 - turnColor
          )
            continue;
          else if (
            board[y + direction[0] * i] !== undefined &&
            board[y + direction[0] * i][x + direction[1] * i] === turnColor
          )
            return true;
        }
      }
    }
  }
};
const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
    if (board[y][x] !== 1 && board[y][x] !== 2) {
      const newBoard = structuredClone(board);
      for (let row = 0; row < 8; row++) {
        for (let element = 0; element < 8; element++) {
          if (newBoard[row][element] === 3) {
            newBoard[row][element] = 0;
          }
        }
      }
      for (const direction of directions) {
        const memoryPosision = [];
        if (
          board[y + direction[0]] !== undefined &&
          board[y + direction[0]][x + direction[1]] === 3 - turnColor
        ) {
          for (let i = 1; i < 8; i++) {
            if (
              board[y + direction[0] * i] !== undefined &&
              board[y + direction[0] * i][x + direction[1] * i] === 3 - turnColor
            ) {
              memoryPosision[memoryPosision.length] = [y + direction[0] * i, x + direction[1] * i];
              continue;
            } else if (
              board[y + direction[0] * i] !== undefined &&
              board[y + direction[0] * i][x + direction[1] * i] === turnColor
            ) {
              newBoard[y][x] = turnColor;
              for (const posision of memoryPosision) {
                newBoard[posision[0]][posision[1]] = turnColor;
              }
              setTurnColor(3 - turnColor);
              console.log(turnColor);
              // setBoard(newBoard);
              break;
            } else {
              break;
            }
          }
        }
      }
      for (let row = 0; row < 8; row++) {
        for (let element = 0; element < 8; element++) {
          if (judge(row, element, newBoard, 3 - turnColor)) {
            newBoard[row][element] = 3;
          }
        }
      }
      setBoard(newBoard);
      score_white[0] = 0;
      score_black[0] = 0;
      for (const rows of newBoard) {
        for (let i = 0; i < 8; i++) {
          if (rows[i] !== 0 && rows[i] !== 3) rows[i] === 1 ? score_black[0]++ : score_white[0]++;
        }
      }
      console.log(score_black, score_white);
    }
  };
  return (
    <div className={styles.container}>
      <div>
        black:{score_black[0]}white:{score_white[0]}
      </div>
      <div>{turnColor === 1 ? 'turn of black' : 'turn of white'}</div>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && color !== 3 && (
                <div
                  className={styles.stoneStyle}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
              {color === 3 && (
                <div
                  className={styles.artstyle}
                  style={{ background: color === 3 ? '#79cff7' : '' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};
export default Home;
