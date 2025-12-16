import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { CategoryService } from '@/app/features/categories/services/category.service';
import { Category } from '@/app/features/categories/models/category.model';
import { filter, Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, CommonModule, AsyncPipe],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})
export class CategoryList implements OnInit{
  categories$?: Observable<Category[]>;
  totalCount?: number;
  list: number[] = [];
  pageNumber = 1;
  pageSize = 3;

  private categoryService = inject(CategoryService);
  private router = inject(Router);

  constructor(){
  }
  ngOnInit(): void {
  this.categoryService.getCategoryCount().subscribe({
    next: (value) => {
      this.totalCount = value;
      this.list = Array.from(
        { length: Math.ceil(value / this.pageSize) },
        (_, i) => i + 1
      );
    }
  });

  // Load categories sau khi có totalCount
  this.categories$ = this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }


  onSearch(query: string): void {
    this.categories$ = this.categoryService.getAllCategories(query);
  }

  sort(sortBy: string, sortDirection: string) {
    this.categories$ = this.categoryService.getAllCategories(undefined, sortBy, sortDirection);
  }

  getPage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.categories$ = this.categoryService.getAllCategories(
          undefined,
          undefined,
          undefined,
          this.pageNumber,
          this.pageSize
        );
  }

  getNextPage () {
    if(this.pageNumber >= this.list.length) return;
    this.pageNumber += 1;
    this.categories$ = this.categoryService.getAllCategories(
          undefined,
          undefined,
          undefined,
          this.pageNumber,
          this.pageSize
        );
  }

  getPrevPage () {
    if(this.pageNumber <= 1) return;
    this.pageNumber -= 1;
    this.categories$ = this.categoryService.getAllCategories(
          undefined,
          undefined,
          undefined,
          this.pageNumber,
          this.pageSize
        );
  }
}
