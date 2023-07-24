import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsDetailPageComponent} from "../news-detail-page/news-detail-page.component";
import {NewsDetailContainerStore} from "./news-detail-container.store";
import {LetDirective} from "@ngrx/component";

@Component({
  selector: 'news-detail-container',
  standalone: true,
  imports: [CommonModule, NewsDetailPageComponent, LetDirective],
  templateUrl: './news-detail-container.component.html',
  styleUrls: ['./news-detail-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsDetailContainerComponent {
  private readonly componentStore = inject(NewsDetailContainerStore)
  public readonly newsItem$ = this.componentStore.newsItem$
  public readonly status$ = this.componentStore.status$

}
