import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsListVM} from "./news-list-view-model";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {NewsItemComponent} from "../news-item/news-item.component";

@Component({
  selector: 'news-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatGridListModule, MatCardModule, MatButtonModule, NewsItemComponent],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListComponent {
  @Input({required: true})
  vm!: NewsListVM;
}
