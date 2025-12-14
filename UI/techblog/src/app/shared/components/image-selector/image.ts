import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogImage } from '@/app/shared/models/blog-image.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private http = inject(HttpClient);
  private APP_API_URL = environment.apiBaseUrl;

  constructor(){}
  uploadImage(file: File, fileName: string, title: string): Observable<BlogImage>{
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName);
      formData.append('title', title);

      return this.http.post<BlogImage>(`${this.APP_API_URL}/images`, formData);
  }
}
