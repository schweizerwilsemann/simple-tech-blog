import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '@/app/features/categories/models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment.development';
import { Category } from '@/app/features/categories/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private APP_API_URL = environment.apiBaseUrl;


  constructor(private http: HttpClient) {}


  addCategory = (category: AddCategoryRequest): Observable<void> => {
    return this.http.post<void>(`${this.APP_API_URL}/Categories`, category);
  }

  getAllCategories = (): Observable<Category[]> => {
    return this.http.get<Category[]>(`${this.APP_API_URL}/Categories`);
  }

}
