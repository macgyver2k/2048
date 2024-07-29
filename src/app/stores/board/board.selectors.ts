import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBoard from './board.reducer';

export const selectBoardState = createFeatureSelector<fromBoard.State>(
  fromBoard.boardFeatureKey
);

export const selectStones = createSelector(
  selectBoardState,
  (state) => state.stones
);

export const selectSlotsIndexed = createSelector(selectStones, (stones) => {
  const chunkSize = Math.sqrt(stones.length);

  return stones
    .map<{ id: string; value: number; column: number; row: number } | null>(
      (stone, index) =>
        stone
          ? {
              id: stone!.id,
              value: stone!.value,
              column: index % chunkSize,
              row: Math.floor(index / chunkSize),
            }
          : null
    )
    .filter((stone) => stone !== null)
    .map(
      (x) => x as { id: string; value: number; column: number; row: number }
    );
});
