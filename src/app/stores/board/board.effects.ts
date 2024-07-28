import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, filter } from 'rxjs/operators';
import { Observable, EMPTY, of, fromEvent } from 'rxjs';
import { BoardActions } from './board.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class BoardEffects {
  keyPress$ = createEffect(() =>
    fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      filter((event) =>
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)
      ),
      map((event) => BoardActions.shift())
    )
  );

  constructor(private actions$: Actions, private store: Store) {}
}
