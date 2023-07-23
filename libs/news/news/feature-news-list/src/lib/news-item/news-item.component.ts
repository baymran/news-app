import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NewsItemVM} from "./news-item.vm";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'news-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgOptimizedImage],
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class NewsItemComponent {
  @Input({required: true})
  newsItem!: NewsItemVM

  public formatDate(date: Date | string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('ru-RU', options);
  }
}
