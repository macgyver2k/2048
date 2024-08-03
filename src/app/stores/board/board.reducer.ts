import { createFeature, createReducer, on } from '@ngrx/store';
import { BoardActions, Direction } from './board.actions';
import { v7 as uuid } from 'uuid';

export const boardFeatureKey = 'board';

export interface Stone {
  id: string;
  value: number;
}

export interface State {
  stones: Stone[];
  move: number;
  insert: boolean;
  showLabel: boolean;
}

const boardWidth = 4;

export const initialState: State = {
  stones: addRandomStone(
    addRandomStone(
      new Array(boardWidth * boardWidth)
        .fill(0)
        .map<Stone>((value, index) => ({ id: uuid(), value: 0 })),
      0
    ),
    1
  ),
  move: 2,
  insert: true,
  showLabel: true,
};

export const reducer = createReducer(
  initialState,
  on(BoardActions.shift, (state, action) => ({
    ...state,
    stones: shiftStones(
      state.stones,
      action.direction,
      state.move,
      state.insert
    ),
    move: state.move + 1,
    insert: state.insert,
  })),
  on(BoardActions.toggleInsert, (state) => ({
    ...state,
    insert: !state.insert,
  })),
  on(BoardActions.toggleLabel, (state) => ({
    ...state,
    showLabel: !state.showLabel,
  }))
);

export const boardFeature = createFeature({
  name: boardFeatureKey,
  reducer,
});

function shiftStones(
  stones: Stone[],
  direction: Direction,
  move: number,
  insert: boolean
): Stone[] {
  const splittedStones = splitStones(stones, boardWidth, direction);
  const updatedRows = splittedStones.map((row) => updateRow(row));
  const mergedRows = mergeStones(updatedRows, direction);
  return insert ? addRandomStone(mergedRows, move) : mergedRows;
}

function updateRow(row: Stone[]): Stone[] {
  let filteredRow = row.filter((stone) => stone.value !== 0);

  for (let i = filteredRow.length - 1; i > 0; i--) {
    if (filteredRow[i]!.value === filteredRow[i - 1]!.value) {
      filteredRow[i] = {
        id: filteredRow[i - 1]!.id,
        value: filteredRow[i - 1]!.value * 2,
      };
      filteredRow.splice(i - 1, 1);
    }
  }

  const result: Stone[] = [...filteredRow];

  while (result.length < row.length) {
    result.unshift({ id: uuid(), value: 0 });
  }
  return result;
}

function splitStones(
  array: Stone[],
  width: number,
  direction: Direction
): Stone[][] {
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
function mergeStones(arrays: Stone[][], direction: Direction): Stone[] {
  let result: Stone[] = [];

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

function addRandomStone(mergedRows: Stone[], move: number): Stone[] {
  const emptySlots = mergedRows
    .map((value, index) => ({ value, index }))
    .filter((entry) => entry.value.value === 0);

  const random = Math.floor(Math.random() * emptySlots.length);
  const randomEmptySlot = emptySlots[random];

  const result = [...mergedRows];
  result[randomEmptySlot.index].value = 2;

  return result;
}
