import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsDetailPageComponent} from "../news-detail-page/news-detail-page.component";

@Component({
  selector: 'news-detail-container',
  standalone: true,
  imports: [CommonModule, NewsDetailPageComponent],
  templateUrl: './news-detail-container.component.html',
  styleUrls: ['./news-detail-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsDetailContainerComponent {}
