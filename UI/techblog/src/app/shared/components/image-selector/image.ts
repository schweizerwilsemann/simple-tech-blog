import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '@/app/shared/models/blog-image.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private http = inject(HttpClient);
  private APP_API_URL = environment.apiBaseUrl;

  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    title: '',
    url: '',
    fileName: '',
    fileExtension: '',
  });


  constructor(){}
  uploadImage(file: File, fileName: string, title: string): Observable<BlogImage>{
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName);
      formData.append('title', title);

      return this.http.post<BlogImage>(`${this.APP_API_URL}/images`, formData);
  }
  getAllImages(): Observable<BlogImage[]>{
    return this.http.get<BlogImage[]>(`${this.APP_API_URL}/images`);
  }

  selectImage(image: BlogImage): void {
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }
}
