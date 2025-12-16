import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '@/app/features/categories/models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@/environments/environment.development';
import { Category } from '@/app/features/categories/models/category.model';
import { UpdateCategoryRequest } from '@/app/features/categories/models/update-category-request.model';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private APP_API_URL = environment.apiBaseUrl;


  constructor(private http: HttpClient) {}


  addCategory = (category: AddCategoryRequest): Observable<void> => {
    return this.http.post<void>(`${this.APP_API_URL}/categories?addAuth=true`, category);
  }

  getAllCategories = (query?: string): Observable<Category[]> => {
    let params = new HttpParams();
    if (query) {
      params = params.set('query', query);
    }
    return this.http.get<Category[]>(`${this.APP_API_URL}/categories`, { params: params });
  }

  getCategoryById = (categoryId: string): Observable<Category> => {
    return this.http.get<Category>(`${this.APP_API_URL}/categories/${categoryId}`);
  }

  updateCategory = (categoryId: string, updateCategoryRequest: UpdateCategoryRequest): Observable<Category> => {
    return this.http.put<Category>(`${this.APP_API_URL}/categories/${categoryId}?addAuth=true`,
                                    updateCategoryRequest);
  }

  deleteCategory = (categoryId: string): Observable<void> => {
    return this.http.delete<void>(`${this.APP_API_URL}/categories/${categoryId}?addAuth=true`);
  }
}
