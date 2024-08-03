import { createActionGroup, emptyProps, props } from '@ngrx/store';

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export const BoardActions = createActionGroup({
  source: 'Board',
  events: {
    Shift: props<{ direction: Direction }>(),
    ToggleInsert: emptyProps(),
    ToggleLabel: emptyProps(),
  },
});
