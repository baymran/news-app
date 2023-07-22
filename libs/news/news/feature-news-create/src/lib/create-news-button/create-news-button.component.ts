import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'news-app-create-news-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-news-button.component.html',
  styleUrls: ['./create-news-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNewsButtonComponent {}
