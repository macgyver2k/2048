import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './board.component';
import { Store } from '@ngrx/store';
import { BoardActions } from './stores/board/board.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoardComponent],
  template: `
    <div class="flex flex-row justify-between">
      <h1 class="py-2 text-7xl font-bold">2048</h1>
      <div class="flex flex-row items-start gap-2 text-white">
        <div class="flex flex-col items-center rounded-sm bg-secondary px-2">
          <span class="uppercase">Score</span>
          <span class="text-2xl font-bold">8</span>
        </div>
        <div class="flex flex-col items-center rounded-sm bg-secondary px-2">
          <span class="uppercase">Best</span>
          <span class="text-2xl font-bold">12345</span>
        </div>
      </div>
    </div>
    <app-board />
    <div class="flex gap-2">
      <input
        id="toggleInsert"
        type="checkbox"
        (change)="toggleInsert()"
        checked
      />
      <label for="toggleInsert">toggleInsert</label>
    </div>
    <div class="flex gap-2">
      <input
        id="toggleShowLabel"
        type="checkbox"
        (change)="toggleShowLabel()"
        checked
      />
      <label for="toggleShowLabel">toggleShowLabel</label>
    </div>
  `,
  styles: [
    `
      :host {
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = '2048';

  constructor(private store: Store) {}

  toggleInsert = () => this.store.dispatch(BoardActions.toggleInsert());
  toggleShowLabel = () => this.store.dispatch(BoardActions.toggleLabel());
}
