import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'photo-upload-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-upload-button.component.html',
  styleUrls: ['./photo-upload-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoUploadButtonComponent {
  @Output() photoSelected = new EventEmitter<string | null>();
  private selectedFile: File | null = null;

  public onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image: string = e.target?.result as string;
        this.photoSelected.emit(base64Image);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
