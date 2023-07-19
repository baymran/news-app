import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsFacade} from "@news/data-access";
import {map} from "rxjs";
import {NewsEntity} from "@core/data-access";
import {NewsListVM} from "../news-list/news-list-view-model";
import {NewsListComponent} from "../news-list/news-list.component";
import {NewsListContainerStore} from "./news-list-container.store";

@Component({
  selector: 'news-list-container',
  standalone: true,
  imports: [CommonModule, NewsListComponent],
  templateUrl: './news-list-container.component.html',
  styleUrls: ['./news-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NewsListContainerStore]
})
export class NewsListContainerComponent {
  private readonly componentStore = inject(NewsListContainerStore)
  private readonly newsFacade = inject(NewsFacade)
  public readonly news$ = this.componentStore.news$

  constructor() {
    this.newsFacade.init()
  }
}
