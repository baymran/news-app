import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {NewsFacade} from "@news/data-access";
import {CreateNewsDialogComponent} from "../create-news-dialog/create-news-dialog.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {NewsItemVM} from "../../../../feature-news-list/src/lib/news-item/news-item.vm";
import {getRandomInteger} from "@core/utils";

@Component({
  selector: 'create-news-button',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './create-news-button.component.html',
  styleUrls: ['./create-news-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNewsButtonComponent {
  private title!: string;
  private description!: string;
  public dialog = inject(MatDialog);
  private readonly newsFacade = inject(NewsFacade);
  private readonly destroyRef = inject(DestroyRef)

  openAddNewsDialog(): void {
    const dialogRef: MatDialogRef<CreateNewsDialogComponent> = this.dialog.open(CreateNewsDialogComponent, {
      data: { title: this.title, description: this.description },
      height: 'auto',
      width: '40%',
      minWidth: '25em',
      enterAnimationDuration: 300,
      exitAnimationDuration: 200,
      hasBackdrop: true
    });
    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          const newPostData: NewsItemVM = {
            id: getRandomInteger(8000, 9000),
            title: result.title,
            description: result.description,
            publishedDate: new Date(Date.now()),
            titleImageUrl: result.titleImageUrl,
          };
          console.log(newPostData)
          this.newsFacade.addNewsItem(newPostData)
        }
      });
  }
}
