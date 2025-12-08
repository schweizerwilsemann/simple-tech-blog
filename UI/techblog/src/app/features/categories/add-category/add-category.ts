import { Component, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import Forms Modules
import { AddCategoryRequest } from '@/app/features/categories/models/add-category-request.model';
import { CategoryService } from '@/app/features/categories/services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  standalone: true, // Mark as standalone
  imports: [
    FormsModule,         // For ngForm directive (required for <form> tags)
    ReactiveFormsModule  // For FormGroup, FormControl, etc.
  ],
  templateUrl: './add-category.html',
  styleUrl: './add-category.scss',
})
export class AddCategory implements OnDestroy{
  model: AddCategoryRequest;
  private addCategorySubscription: Subscription | undefined;

  constructor(private categoryService: CategoryService){
    this.model = {
      name : '',
      urlHandle: ''
    }
  }
  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
  onFormSubmit = () =>  {
    this.addCategorySubscription = this.categoryService.addCategory(this.model).subscribe({
      next: (response) => {
        console.log(">>> successful: ", response);
      },
      error: (error) => {}
    });
  }
}
