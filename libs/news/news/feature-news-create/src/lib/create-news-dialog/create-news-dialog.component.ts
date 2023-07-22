import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'news-app-create-news-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-news-dialog.component.html',
  styleUrls: ['./create-news-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNewsDialogComponent {}
