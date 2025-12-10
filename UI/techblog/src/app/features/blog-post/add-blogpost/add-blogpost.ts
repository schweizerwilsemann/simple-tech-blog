import { AddBlogPost } from '@/app/features/blog-post/models/add-blogpost.model';
import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogPostService } from '@/app/features/blog-post/services/blog-post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  imports: [FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.scss',
})
export class AddBlogpostComponent {
  model: AddBlogPost;
  private blogPostService = inject(BlogPostService);
  private router = inject(Router);

  constructor () {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      author: '',
      publishedDate: new Date(),
      isVisible: true
    }
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
