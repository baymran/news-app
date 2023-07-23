import {ChangeDetectionStrategy, Component, Inject, inject, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {PhotoUploadButtonComponent} from "../photo-upload-button/photo-upload-button.component";

@Component({
  selector: 'create-news-dialog',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, PhotoUploadButtonComponent],
  templateUrl: './create-news-dialog.component.html',
  styleUrls: ['./create-news-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class CreateNewsDialogComponent {
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<CreateNewsDialogComponent>);
  public formGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', [Validators.required]],
  });
  public base64image: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string, email: string, photo: File },
  ) {
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onConfirm(): void {
    if (this.formGroup.valid) {
      const {title, description} = this.formGroup.value
      const titleImageUrl = this.base64image
      const formData = {title, description, titleImageUrl}
      this.dialogRef.close(formData);
    }
  }

  public onPhotoSelected(file: string | null): void {
    this.base64image = file;
  }

  public onPhotoRemoved() {
    this.base64image = null
  }
}
