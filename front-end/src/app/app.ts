import { Component, signal } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.scss',
    imports: [MatToolbar, RouterOutlet]
})
export class App {
  protected readonly title = signal('crud-angular-spring');
}
