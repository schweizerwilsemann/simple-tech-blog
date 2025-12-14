import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageService } from './image';

@Component({
  selector: 'app-image-selector',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './image-selector.html',
  styleUrl: './image-selector.scss',
})
export class ImageSelector {
  private file?: File;
  private imageService = inject(ImageService);

  fileName: string = '';
  title: string = '';


  constructor() {}

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];

  }

  uploadImage(): void {

    if (this.file && this.fileName !== '' && this.title !== '') {
      // Image service to upload the image
      this.imageService.uploadImage(this.file, this.fileName, this.title).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}
