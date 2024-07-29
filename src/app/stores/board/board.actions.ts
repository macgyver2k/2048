import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const BoardActions = createActionGroup({
  source: 'Board',
  events: {
    Shift: emptyProps(),
  },
});
