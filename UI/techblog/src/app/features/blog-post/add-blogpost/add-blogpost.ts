import { AddBlogPost } from '@/app/features/blog-post/models/add-blogpost.model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogPostService } from '@/app/features/blog-post/services/blog-post';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '@/app/features/categories/services/category.service';
import { Observable } from 'rxjs';
import { Category } from '@/app/features/categories/models/category.model';

@Component({
  selector: 'app-add-blogpost',
  imports: [FormsModule, ReactiveFormsModule, DatePipe, AsyncPipe, MarkdownModule],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.scss',
})
export class AddBlogpostComponent implements OnInit{
  model: AddBlogPost;
  categories$? : Observable<Category[]>;

  private blogPostService = inject(BlogPostService);
  private router = inject(Router);
  private categoryService = inject(CategoryService)

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
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

  onFormSubmit = () => {
    this.blogPostService.createBlogPost(this.model).subscribe({
      next: () => {
        this.router.navigate(['/admin/blogposts']);
      },
      error: (error) => console.log(error)
    })
  }
}
