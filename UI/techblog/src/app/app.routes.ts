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
import { authGuard } from './features/auth/guards/auth-guard';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
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
    component: CategoryList,
    canActivate: [authGuard]
  },
  {
    path: 'admin/categories/add',
    component: AddCategory,
    canActivate: [authGuard]
  },
  {
    path: 'admin/categories/:id',
    component: EditCategory,
    canActivate: [authGuard]
  },
  {
    path: 'admin/blogposts',
    component: BlogpostList,
    canActivate: [authGuard]
  },
  {
    path: 'admin/blogposts/add',
    component: AddBlogpostComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/blogposts/:id',
    component: EditBlogpost,
    canActivate: [authGuard]
  },
];
