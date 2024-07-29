import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { map, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { BoardActions, Direction } from './board.actions';
import { Store } from '@ngrx/store';

const keyDirections: { [index: string]: Direction } = {
  ArrowUp: Direction.Up,
  ArrowDown: Direction.Down,
  ArrowLeft: Direction.Left,
  ArrowRight: Direction.Right,
};

@Injectable()
export class BoardEffects {
  keyPress$ = createEffect(() =>
    fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      filter((event) =>
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)
      ),
      map((event) =>
        BoardActions.shift({ direction: keyDirections[event.key] })
      )
    )
  );

  constructor(private actions$: Actions, private store: Store) {}
}
