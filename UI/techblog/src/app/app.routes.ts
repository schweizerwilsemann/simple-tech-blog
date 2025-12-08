import { Routes } from '@angular/router';
import { CategoryList } from './features/categories/category-list/category-list';
import { HomeComponent } from './features/home/home';
import { AddCategory } from './features/categories/add-category/add-category';

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
  }
];
