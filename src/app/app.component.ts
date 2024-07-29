import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoardComponent],
  template: ` <app-board /> `,
  styles: [
    `
      :host {
        @apply flex flex-col items-center justify-center h-full;
      }
    `,
  ],
})
export class AppComponent {
  title = '2048';
}
