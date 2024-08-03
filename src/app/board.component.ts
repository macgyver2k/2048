import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectShowLabel,
  selectSlotsIndexed,
} from './stores/board/board.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative h-[500px] bg-[#bbada0] p-2">
      <div class="relative h-full w-full">
        <div
          class="absolute h-1/4 w-1/4 p-2"
          [ngClass]="{
            'top-[0%]': cell.row === 0,
            'top-1/4': cell.row === 1,
            'top-2/4': cell.row === 2,
            'top-3/4': cell.row === 3,
            'left-0': cell.column === 0,
            'left-1/4': cell.column === 1,
            'left-2/4': cell.column === 2,
            'left-3/4': cell.column === 3,

          }"
          *ngFor="let cell of rows$ | async; trackBy: trackById"
        >
          <div
            class="flex h-full items-center justify-center rounded-[3px] bg-[#cdc1b4] text-5xl font-bold"
          ></div>
        </div>
        <div
          class="absolute z-10 h-1/4 w-1/4 p-2 opacity-20 transition-all duration-1000"
          [ngClass]="{
            'top-[0%]': cell.row === 0,
            'top-1/4': cell.row === 1,
            'top-2/4': cell.row === 2,
            'top-3/4': cell.row === 3,
            'left-0': cell.column === 0,
            'left-1/4': cell.column === 1,
            'left-2/4': cell.column === 2,
            'left-3/4': cell.column === 3,
            '!opacity-100': cell.value !== 0
          }"
          *ngFor="let cell of rows$ | async; trackBy: trackById"
        >
          @let selectShowLabel = selectShowLabel$ | async;
          <div
            class="flex h-full items-center justify-center rounded-[3px]"
            [style.background-color]="originalColors[cell.value]"
            [style.color]="cell.value >= 8 ? '#f9f6f2' : '#776e65'"
            [ngClass]="{
              'text-5xl font-bold': selectShowLabel,
              'text-sm': !selectShowLabel
            }"
          >
            @if( selectShowLabel ) {
            {{ cell.value }}
            } @else {
            {{ cell.id.slice(-6) }}
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class BoardComponent {
  rows$ = this.store.select(selectSlotsIndexed);
  selectShowLabel$ = this.store.select(selectShowLabel);

  numbers = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
  originalColors: { [index: number]: string } = {
    2: '#eee4da',
    4: '#eee1c9',
    8: '#f3b27a',
    16: '#f69664',
    32: '#f77c5f',
    64: '#f75f3b',
    128: '#edd073',
    256: '#edcc62',
    512: '#00ff00',
    1024: '#edc53f',
    2048: '#0000ff',
    4096: '#00ffff',
  };

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
