import { Routes } from '@angular/router';
import { CategoryList } from './features/categories/category-list/category-list';
import { AddCategory } from './features/categories/add-category/add-category';
import { EditCategory } from './features/categories/edit-category/edit-category';
import { BlogpostList } from './features/blog-post/blogpost-list/blogpost-list';
import { AddBlogpostComponent} from './features/blog-post/add-blogpost/add-blogpost';
import { EditBlogpost } from './features/blog-post/edit-blogpost/edit-blogpost';
import { Home } from './features/public/home/home';
import { BlogDetails } from './features/public/blog-details/blog-details';
import { Login } from './features/auth/login/login';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'login',
    component: Login
  },
  // {
  //   path: 'register',
  //   component: Register
  // },
  {
    path: 'blog/:url',
    component: BlogDetails
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
  },
  {
    path: 'admin/blogposts/add',
    component: AddBlogpostComponent
  },
  {
    path: 'admin/blogposts/:id',
    component: EditBlogpost
  },
];
