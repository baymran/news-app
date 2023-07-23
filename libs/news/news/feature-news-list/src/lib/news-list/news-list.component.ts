import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsListVM} from "./news-list-view-model";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {NewsItemComponent} from "../news-item/news-item.component";
import {Subject, throttleTime} from "rxjs";

@Component({
  selector: 'news-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatGridListModule, MatCardModule, MatButtonModule, NewsItemComponent],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListComponent {
  @Input({required: true}) vm!: NewsListVM;
  private readonly scrollThreshold: number = 30;
  private lastScrollY: number = 0;
  private scrollEndEvent = new Subject<void>();
  @Output() throttledEvent= this.scrollEndEvent.pipe(throttleTime(300));

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.isAtBottom() && this.lastScrollY < window.scrollY) {
      this.scrollEndEvent.next()
    }
    this.lastScrollY = window.scrollY;
  }

  private isAtBottom(): boolean {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const bodyHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    );

    return scrollY + windowHeight >= bodyHeight - this.scrollThreshold;
  }
}
