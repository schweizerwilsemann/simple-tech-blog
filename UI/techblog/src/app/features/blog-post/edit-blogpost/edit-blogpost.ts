import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '@/app/features/blog-post/services/blog-post';
import { BlogPost } from '@/app/features/blog-post/models/blog-post.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  AsyncPipe, DatePipe } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '@/app/features/categories/services/category.service';
import { Category } from '@/app/features/categories/models/category.model';
import { UpdateBlogPost } from '@/app/features/blog-post/models/update-blogpost.model';

@Component({
  selector: 'app-edit-blogpost',
  imports: [FormsModule, ReactiveFormsModule, DatePipe, AsyncPipe,MarkdownModule],
  templateUrl: './edit-blogpost.html',
  styleUrl: './edit-blogpost.scss',
})
export class EditBlogpost implements OnInit, OnDestroy{
  id : string | null = null;
  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;

  model?: BlogPost
  categories$? : Observable<Category []>;
  selectedCategories?: string[];


  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogPostService = inject(BlogPostService);
  private categoryService = inject(CategoryService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);


  blogPost?: BlogPost;
  isLoading: boolean = true;

  constructor() { }


  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        // get blogpost api
        if(this.id){
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id!).subscribe({
            next: (blogPost) => {
              this.model = blogPost;
              this.selectedCategories = blogPost.categories.map(category => category.id)

              this.isLoading = false;
              this.cdr.detectChanges();
            },
            error: () => {
              this.isLoading = false;
              this.cdr.detectChanges();
            }
          });
        }
      },
    })
  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
  }

  onFormSubmit(): void {
    // conver this model to RequestObject
    if(this.model && this.id){
      var updateBlogPost: UpdateBlogPost = {
        title: this.model.title,
        shortDescription: this.model.shortDescription,
        content: this.model.content,
        featuredImageUrl: this.model.featuredImageUrl,
        urlHandle: this.model.urlHandle,
        publishedDate: this.model.publishedDate.toString(),
        author: this.model.author,
        isVisible: this.model.isVisible,
        categories: this.selectedCategories!
      };

      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost).subscribe({
        next: (blogPost) => {
          this.router.navigateByUrl("admin/blogposts")
        }
      })
    }
  }

}
