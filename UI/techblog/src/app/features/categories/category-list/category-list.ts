import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CategoryService } from '@/app/features/categories/services/category.service';
import { Category } from '@/app/features/categories/models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, CommonModule, AsyncPipe],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})
export class CategoryList implements OnInit{
  categories$?: Observable<Category[]>;
  private categoryService = inject(CategoryService);
  constructor(){
  }

  ngOnInit (): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

  onSearch(query: string): void {
    this.categories$ = this.categoryService.getAllCategories(query);
  }

  sort(sortBy: string, sortDirection: string) {
    console.log(">>>> im sorting here")
    this.categories$ = this.categoryService.getAllCategories(undefined, sortBy, sortDirection);
  }
}
