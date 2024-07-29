import { createFeature, createReducer, on } from '@ngrx/store';
import { BoardActions } from './board.actions';

export const boardFeatureKey = 'board';

export interface Stone {
  id: string;
  value: number;
}

export interface State {
  stones: (Stone | null)[];
}

const boardWidth = 4;

export const initialState: State = {
  stones: initialSlots(),
};

export const reducer = createReducer(
  initialState,
  on(BoardActions.shift, (state, action) => {
    const stones = [...state.stones];

    for (let index = 1; index < stones.length - 1; index++) {
      const stone = stones[index];

      if (stone === null) continue;

      stones[index - 1] = { ...stone };
      stones[index] = null;
    }

    return {
      stones: stones,
    };
  })
);

export const boardFeature = createFeature({
  name: boardFeatureKey,
  reducer,
});
function initialSlots(): (Stone | null)[] {
  var positions = [
    Math.floor(Math.random() * (boardWidth * boardWidth)),
    Math.floor(Math.random() * (boardWidth * boardWidth)),
  ];

  console.log('positions', positions);

  const emptySlots = new Array(boardWidth * boardWidth).fill(null);
  emptySlots[positions[0]] = { id: 0, value: 2 };
  emptySlots[positions[1]] = { id: 1, value: 2 };

  console.log('emptySlots', emptySlots);

  return emptySlots;
}
