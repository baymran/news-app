import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
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
  @Output() photoSelected = new EventEmitter<File | null>();
  private selectedFile: File | null = null;

  public onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      this.photoSelected.emit(this.selectedFile);
    }
  }

  public removeSelectedFile(): void {
    this.selectedFile = null;
    // Сбрасываем значение выбранного файла и отправляем null в родительский компонент
    this.photoSelected.emit(null);
  }
}
