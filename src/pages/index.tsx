import { useState } from 'react';
import styles from './index.module.css';
//const score_white = [2];
//const score_black = [2];
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
const memoryposition: number[] = [];
const judge = (y: number, x: number, board: number[][], turnColor: number) => {
  memoryposition.length = 0;
  if (board[y][x] !== 1 && board[y][x] !== 2) {
    let preTrue = false;
    for (const direction of directions) {
      const prememoryPosition = [];
      if (
        board[y + direction[0]] !== undefined &&
        board[y + direction[0]][x + direction[1]] === 3 - turnColor
      ) {
        for (let i = 1; i < 9; i++) {
          if (
            board[y + direction[0] * i] !== undefined &&
            board[y + direction[0] * i][x + direction[1] * i] === 3 - turnColor
          ) {
            prememoryPosition.push([y + direction[0] * i, x + direction[1] * i]);
            continue;
          } else if (
            board[y + direction[0] * i] !== undefined &&
            board[y + direction[0] * i][x + direction[1] * i] === turnColor
          ) {
            for (const mpm of prememoryPosition) {
              memoryposition.push(mpm);
            }
            preTrue = true;
            break;
          } else {
            break;
          }
        }
      }
    }
    if (preTrue) {
      return true;
    }
  }
};
const invert = (board: number[][], turnColor: number) => {
  for (const mp of memoryposition) {
    board[mp[0]][mp[1]] = turnColor;
  }
  return board;
};
// const suggest = (y: number, x: number, board: number[][], turnColor: number) =>{
// for(let row=0 ; row < 8;row++)
//   for(let element=0 ; element < 8 ; element++)
//       if ()
// }
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
    const newBoard: number[][] = structuredClone(board);

    if (judge(y, x, newBoard, turnColor)) {
      //console.log(memoryposition);
      newBoard[y][x] = turnColor;
      setTurnColor(3 - turnColor);
      console.log(turnColor);

      const newBoard2: number[][] = invert(newBoard, turnColor);
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (newBoard2[i][j] === 3) {
            newBoard2[i][j] = 0;
          }
          if (judge(i, j, newBoard2, 3 - turnColor)) {
            newBoard2[i][j] = 3;
          }
        }
      }
    }
    setBoard(newBoard);
    const blue = board.flat().filter((num) => num === 3);
    if (blue.length === 0) {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (judge(i, j, newBoard, 3 - turnColor)) {
            newBoard[i][j] = 3;
          }
        }
      }
      setTurnColor(3 - turnColor);
      setBoard(newBoard);
    }
  };
  const black = board.flat().filter((num) => num === 1);
  const white = board.flat().filter((num) => num === 2);
  const blue = board.flat().filter((num) => num === 3);
  //console.log(black);
  // console.log(white);

  return (
    <div className={styles.container}>
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
      <div className={styles.scoreBoard}>
        <div>
          black:{black.length}white:{white.length}
        </div>
        <div>{turnColor === 1 ? 'turn of black' : 'turn of white'}</div>
        <div>{blue.length === 0 ? 'pass(click)' : ''}</div>
      </div>
    </div>
  );
};
export default Home;
