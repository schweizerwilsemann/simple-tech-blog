import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { BlogPostService } from '@/app/features/blog-post/services/blog-post';
import { Observable } from 'rxjs';
import { BlogPost } from '@/app/features/blog-post/models/blog-post.model';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit{
  blogPosts$? : Observable<BlogPost[]>;

  private blogPostService = inject(BlogPostService);

  constructor() {}
  ngOnInit(): void {
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();
  }
}
