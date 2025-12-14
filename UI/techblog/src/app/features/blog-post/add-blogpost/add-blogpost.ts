import { AddBlogPost } from '@/app/features/blog-post/models/add-blogpost.model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogPostService } from '@/app/features/blog-post/services/blog-post';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '@/app/features/categories/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '@/app/features/categories/models/category.model';
import { ImageSelector } from '@/app/shared/components/image-selector/image-selector';
import { ImageService } from '@/app/shared/components/image-selector/image';


@Component({
  selector: 'app-add-blogpost',
  imports: [FormsModule, ReactiveFormsModule, DatePipe, AsyncPipe, MarkdownModule, ImageSelector],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.scss',
})
export class AddBlogpostComponent implements OnInit, OnDestroy{
  model: AddBlogPost;
  categories$? : Observable<Category[]>;
  isImageSelectorVisible: boolean = false;

  imageSelectorSubscription?: Subscription;

  private blogPostService = inject(BlogPostService);
  private router = inject(Router);
  private categoryService = inject(CategoryService)
  private imageService = inject (ImageService);

  constructor () {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      author: '',
      publishedDate: new Date(),
      isVisible: true,
      categories: []
    }
  }
  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.imageSelectorSubscription =this.imageService.onSelectImage().subscribe({
      next: (selectedImage) => {
        this.model.featuredImageUrl = selectedImage.url;
        this.closeImageSelector();
      }
    })
  }

  onFormSubmit = () => {
    this.blogPostService.createBlogPost(this.model).subscribe({
      next: () => {
        this.router.navigate(['/admin/blogposts']);
      },
      error: (error) => console.log(error)
    })
  }

  openImageSelector(): void {
    console.log("<<<<< IMAGW Im here mate: ")
    this.isImageSelectorVisible = true;
  }
  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }
}
