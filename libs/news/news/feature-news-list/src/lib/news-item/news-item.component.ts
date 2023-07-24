import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NewsItemVM} from "./news-item.vm";
import {MatCardModule} from "@angular/material/card";
import {formatDate} from "@core/utils";

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
  @Input({required: true}) newsItem!: NewsItemVM
  @Output() readMoreClicked = new EventEmitter<string>()
  protected readonly formatDate = formatDate;
}
