import { Routes } from '@angular/router';
import { CategoryList } from './features/categories/category-list/category-list';
import { HomeComponent } from './features/home/home';
import { AddCategory } from './features/categories/add-category/add-category';
import { EditCategory } from './features/categories/edit-category/edit-category';
import { BlogpostList } from './features/blog-post/blogpost-list/blogpost-list';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: "admin/categories",
    component: CategoryList
  },
  {
    path: 'admin/categories/add',
    component: AddCategory
  },
  {
    path: 'admin/categories/:id',
    component: EditCategory
  },
  {
    path: 'admin/blogposts',
    component: BlogpostList
  }
];
