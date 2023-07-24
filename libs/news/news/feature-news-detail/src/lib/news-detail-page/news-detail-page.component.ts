import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsEntity} from "@core/data-access";
import {NewsDetailVm} from "../news-detail.vm";
import {LetDirective} from "@ngrx/component";
import {formatDate} from "@core/utils";

@Component({
  selector: 'news-detail-page',
  standalone: true,
  imports: [CommonModule, LetDirective],
  templateUrl: './news-detail-page.component.html',
  styleUrls: ['./news-detail-page.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsDetailPageComponent {
  @Input({required: true}) vm!: NewsDetailVm
  protected readonly formatDate = formatDate;
}
