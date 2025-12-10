import { Component, inject, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '@/app/features/categories/services/category.service';
import { Category } from '@/app/features/categories/models/category.model';
import { FormsModule } from '@angular/forms';
import { UpdateCategoryRequest } from '@/app/features/categories/models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  imports: [FormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.scss',
})
export class EditCategory implements OnInit, OnDestroy {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  id: string | null = null;
  paramsSubscription?: Subscription;
  editCategorySubscription?: Subscription;

  category?: Category;
  isLoading: boolean = true;  // ← Thêm loading flag

  constructor() {}

  getRouter(): Router {
    return this.router;
  }
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }

  ngOnInit(): void {
  this.paramsSubscription = this.route.paramMap.subscribe({
    next: (params) => {
      this.id = params.get("id");

      if(this.id){

        this.categoryService.getCategoryById(this.id)
        .subscribe({
          next: (response) => {
            this.category = response;
            this.isLoading = false;
            this.cdr.detectChanges();
          },
          error: (error) => {
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        })
      } else {
        console.log('No ID found in route');  // ← Thêm log
      }
    }
  });
}

  onFormSubmit(): void {
    // Lấy giá trị trực tiếp từ category object (đã được update qua ngModel)
    if (this.category && this.id) {
      const updateCategoryRequest: UpdateCategoryRequest = {
        name: this.category.name,      // ← Giá trị đã được update
        urlHandle: this.category.urlHandle,  // ← Giá trị đã được update
      };

      this.editCategorySubscription = this.categoryService
        .updateCategory(this.id, updateCategoryRequest)
        .subscribe({
          next: response => {
            this.router.navigateByUrl('/admin/categories');
          },
          error: (error) => {
            console.error('Error updating category:', error);
          }
        });
    }
  }

  onDelete(): void {
    if (this.id){
      this.categoryService.deleteCategory(this.id)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/admin/categories');
        },
        error: (error) => {
          console.error('Error deleting category:', error);
        }
      });
    }
  }
}
