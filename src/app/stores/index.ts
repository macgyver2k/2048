import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromBoard from './board/board.reducer';

export interface State {

  [fromBoard.boardFeatureKey]: fromBoard.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromBoard.boardFeatureKey]: fromBoard.reducer,
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
