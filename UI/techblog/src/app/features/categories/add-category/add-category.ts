import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import Forms Modules
import { AddCategoryRequest } from '@/app/features/categories/models/add-category-request.model';

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
export class AddCategory {
  model: AddCategoryRequest

  constructor(){
    this.model = {
      name : '',
      urlHandle: ''
    }
  }
  onFormSubmit = () =>  {
    console.log(">>>> check name: ", this.model.name);
    console.log(">>>> check url handle: ", this.model.urlHandle);
  }
}
