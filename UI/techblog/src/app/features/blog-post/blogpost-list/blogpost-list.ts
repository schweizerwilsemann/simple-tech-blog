import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { BlogPostService } from '@/app/features/blog-post/services/blog-post';
import { Observable } from 'rxjs';
import { BlogPost } from '@/app/features/blog-post/models/blog-post.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-blogpost-list',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './blogpost-list.html',
  styleUrl: './blogpost-list.scss',
})
export class BlogpostList implements OnInit {
  blogPosts$?: Observable<BlogPost[]>;

  private blogPostService = inject(BlogPostService);

  constructor() { }

  ngOnInit(): void {
    // get all post blogs
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();
  }

}
