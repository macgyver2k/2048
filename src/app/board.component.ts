import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSlotsIndexed } from './stores/board/board.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative h-96 w-96 bg-[#bbada0]">
      <div
        class="absolute h-24 w-24 p-2 transition-all duration-500"
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
          class="flex h-full items-center justify-center rounded-md text-4xl text-[#776e65]"
          [style.background-color]="colors[cell.value]"
        >
          {{ cell.value }}
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class BoardComponent {
  rows$ = this.store.select(selectSlotsIndexed);

  numbers = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
  colors = this.numbers.reduce(
    (sum, value, index) => ({
      ...sum,
      [value]: this.getGradientColor(index, this.numbers.length),
    }),
    {} as { [index: number]: string }
  );

  constructor(private store: Store) {}

  trackById(index: number, item: { id: string }) {
    return item.id;
  }

  getGradientColor(value: number, length: number) {
    const normalized = value / length;
    const start = { r: 238, g: 228, b: 218 };
    const end = { r: 255, g: 0, b: 0 };

    const r = Math.round(start.r * (1 - normalized) + end.r * normalized);
    const g = Math.round(start.g * (1 - normalized) + end.g * normalized);
    const b = Math.round(start.b * (1 - normalized) + end.b * normalized);

    const hex = ((r << 16) | (g << 8) | b)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase();

    return `#${hex}`;
  }
}
