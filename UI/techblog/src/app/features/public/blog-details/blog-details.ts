import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '@/app/features/blog-post/services/blog-post';
import { Observable } from 'rxjs';
import { BlogPost } from '@/app/features/blog-post/models/blog-post.model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-details',
  imports: [AsyncPipe, DatePipe, MarkdownModule],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.scss',
})
export class BlogDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private blogPostService = inject(BlogPostService);

  url: string | null = null;

  blogPost$? : Observable<BlogPost>;



  constructor() {}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.url = params.get('url');
        // fetch blog details by url
        if (this.url) {
          this.blogPost$ = this.blogPostService.getBlogPostByUrlHandle(this.url);
        }
      }
    });
  }
}
