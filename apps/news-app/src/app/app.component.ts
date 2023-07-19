import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  standalone: true,
  imports: [
    RouterOutlet
  ],
  selector: 'news-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'news-app';
}
