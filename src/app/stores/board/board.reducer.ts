import { createFeature, createReducer, on } from '@ngrx/store';
import { BoardActions } from './board.actions';

export const boardFeatureKey = 'board';

export interface State {}

export const initialState: State = {};

export const reducer = createReducer(initialState);

export const boardFeature = createFeature({
  name: boardFeatureKey,
  reducer,
});
