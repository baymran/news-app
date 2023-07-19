import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'news-list-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-list-container.component.html',
  styleUrls: ['./news-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListContainerComponent {}
