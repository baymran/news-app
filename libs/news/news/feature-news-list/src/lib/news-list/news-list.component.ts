import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'news-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListComponent {}
