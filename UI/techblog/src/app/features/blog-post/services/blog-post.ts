import { inject, Injectable } from '@angular/core';
import { AddBlogPost } from '@/app/features/blog-post/models/add-blogpost.model';
import { BlogPost } from '@/app/features/blog-post/models/blog-post.model';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  private http = inject(HttpClient);
  private APP_API_URL = environment.apiBaseUrl;

  constructor() {}
  createBlogPost(data: AddBlogPost) : Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.APP_API_URL}/blogposts`, data);
  }
}
