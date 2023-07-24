import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsListComponent} from "../news-list/news-list.component";
import {NewsListContainerStore} from "./news-list-container.store";
import {LetDirective, PushPipe} from "@ngrx/component";
import {CreateNewsButtonComponent} from "@news/feature-news-create";
import {Router} from "@angular/router";

@Component({
  selector: 'news-list-container',
  standalone: true,
  imports: [CommonModule, NewsListComponent, PushPipe, LetDirective, CreateNewsButtonComponent],
  templateUrl: './news-list-container.component.html',
  styleUrls: ['./news-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NewsListContainerStore]
})
export class NewsListContainerComponent {
  private readonly componentStore = inject(NewsListContainerStore);
  public readonly news$ = this.componentStore.news$;
  public readonly status$ = this.componentStore.status$;
  private readonly router = inject(Router)

  public updatePageCounter() {
    this.componentStore.loadMoreNewsByScroll()
  }

  public getDetailsFromApi(slug: string) {
    this.componentStore.fetchItemDetails(slug)
    const url = slug.split('/')
    this.router.navigate(['/detail', ...url])
  }
}
