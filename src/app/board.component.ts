import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSlotsIndexed } from './stores/board/board.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- <pre>{{ rows$ | async | json }}</pre> -->
    <div class="relative h-96 w-96 bg-[#bbada0]">
      <div
        class="absolute h-24 w-24 p-2 transition-all"
        [ngClass]="{
          'top-0': cell.row === 0,
          'top-1/4': cell.row === 1,
          'top-2/4': cell.row === 2,
          'top-3/4': cell.row === 3,
          'left-0': cell.column === 0,
          'left-1/4': cell.column === 1,
          'left-2/4': cell.column === 2,
          'left-3/4': cell.column === 3
        }"
        *ngFor="let cell of rows$ | async; trackBy: trackById"
      >
        <div
          class="flex h-full items-center justify-center rounded-md bg-[#eee4da] text-4xl text-[#776e65]"
        >
          {{ cell.value | json }}
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class BoardComponent {
  rows$ = this.store.select(selectSlotsIndexed);

  constructor(private store: Store) {}

  trackById(index: number, item: { id: string }) {
    return item.id;
  }
}
