import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ImageService } from './image';
import { Observable } from 'rxjs';
import { BlogImage } from '@/app/shared/models/blog-image.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-image-selector',
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './image-selector.html',
  styleUrl: './image-selector.scss',
})
export class ImageSelector implements OnInit, OnDestroy{
  private file?: File;
  private imageService = inject(ImageService);

  fileName: string = '';
  title: string = '';
  images$?: Observable<BlogImage[]>;

  @ViewChild('form', { static: false }) imageUploadForm? :NgForm;

  constructor() {}

  private getAllImages = () => {
    this.images$ = this.imageService.getAllImages()
  }

  ngOnInit(): void {
    this.getAllImages();
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }


  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage(): void {

    if (this.file && this.fileName !== '' && this.title !== '') {
      // Image service to upload the image
      this.imageService.uploadImage(this.file, this.fileName, this.title).subscribe({
        next: () => {
          this.imageUploadForm?.reset();
          this.getAllImages();
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  selectImage(blogPostImage: BlogImage): void {
    this.imageService.selectImage(blogPostImage);
  }


}
