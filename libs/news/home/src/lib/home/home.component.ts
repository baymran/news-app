import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsListContainerComponent} from "@news/feature-news-list";

@Component({
  selector: 'news-home',
  standalone: true,
  imports: [CommonModule, NewsListContainerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
