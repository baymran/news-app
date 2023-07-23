import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'news-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-detail-page.component.html',
  styleUrls: ['./news-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsDetailPageComponent {}
