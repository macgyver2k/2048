import { createFeature, createReducer, on } from '@ngrx/store';
import { BoardActions, Direction } from './board.actions';

export const boardFeatureKey = 'board';

export interface Stone {
  id: string;
  value: number;
}

export interface State {
  stones: (Stone | null)[];
  move: number;
}

const boardWidth = 4;

export const initialState: State = {
  stones: addRandomStone(
    addRandomStone(new Array(boardWidth * boardWidth).fill(null), 0),
    1
  ),
  move: 0,
};

export const reducer = createReducer(
  initialState,
  on(BoardActions.shift, (state, action) => ({
    stones: shiftStones(state.stones, action.direction, state.move),
    move: state.move + 1,
  }))
);

export const boardFeature = createFeature({
  name: boardFeatureKey,
  reducer,
});

function shiftStones(
  stones: (Stone | null)[],
  direction: Direction,
  move: number
): (Stone | null)[] {
  const splittedStones = splitStones(stones, boardWidth, direction);
  const updatedRows = splittedStones.map((row) => updateRow(row));
  const mergedRows = mergeStones(updatedRows, direction);
  return addRandomStone(mergedRows, move);
}

function updateRow(row: (Stone | null)[]): (Stone | null)[] {
  let filteredRow = row.filter((stone) => stone !== null);

  for (let i = filteredRow.length - 1; i > 0; i--) {
    if (filteredRow[i]!.value === filteredRow[i - 1]!.value) {
      filteredRow[i] = {
        id: filteredRow[i - 1]!.id,
        value: filteredRow[i - 1]!.value * 2,
      };
      filteredRow.splice(i - 1, 1);
    }
  }

  const result: (Stone | null)[] = [...filteredRow];

  while (result.length < row.length) {
    result.unshift(null);
  }
  return result;
}

function splitStones(
  array: (Stone | null)[],
  width: number,
  direction: Direction
): (Stone | null)[][] {
  let matrix = Array.from({ length: width }, (_, i) =>
    array.slice(i * width, (i + 1) * width)
  );

  switch (direction) {
    case Direction.Right:
      break;
    case Direction.Left:
      matrix = flipMatrix(matrix);
      break;
    case Direction.Up:
      matrix = rotateMatrix(matrix);
      break;
    case Direction.Down:
      matrix = rotateMatrixReverse(matrix);
      break;

    default:
      throw new Error('Invalid direction');
  }

  return matrix;
}
function mergeStones(
  arrays: (Stone | null)[][],
  direction: Direction
): (Stone | null)[] {
  let result: (Stone | null)[] = [];

  switch (direction) {
    case Direction.Right:
      result = arrays.flat();
      break;
    case Direction.Left:
      result = arrays.flatMap((row) => row.reverse());
      break;
    case Direction.Up:
      result = rotateMatrixReverse(arrays).flat();
      break;
    case Direction.Down:
      result = rotateMatrix(arrays).flat();
      break;

    default:
      throw new Error('Invalid direction');
  }

  return result;
}

function rotateMatrix<T>(matrix: T[][]) {
  return matrix[0].map((val, index) =>
    matrix.map((row) => row[index]).reverse()
  );
}

function rotateMatrixReverse<T>(matrix: T[][]) {
  return matrix[0].map((val, index) =>
    matrix.map((row) => row[row.length - 1 - index])
  );
}

function flipMatrix<T>(matrix: T[][]) {
  return matrix.map((val) => val.reverse());
}

function addRandomStone(
  mergedRows: (Stone | null)[],
  move: number
): (Stone | null)[] {
  const emptySlots = mergedRows
    .map((value, index) => ({ value, index }))
    .filter((entry) => entry.value === null);

  const random = Math.floor(Math.random() * emptySlots.length);
  const randomEmptySlot = emptySlots[random];

  const result = [...mergedRows];
  result[randomEmptySlot.index] = { id: (move + 1).toString(), value: 2 };

  return result;
}
