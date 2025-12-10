import { AddBlogpost } from '@/app/features/blog-post/model/add-blogpost.model';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-blogpost',
  imports: [FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.scss',
})
export class AddBlogpostComponent {
  model: AddBlogpost;

  constructor () {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      author: '',
      publishedDate: new Date(),
      isVisible: true
    }
  }

  onFormSubmit = () => {
    console.log(this.model);
  }
}
