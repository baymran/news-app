import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'news-app-news-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsItemComponent {}
