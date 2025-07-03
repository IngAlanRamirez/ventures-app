import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiRequest = inject(ApiService);
  private categoriesUrl = `${
    environment.SERVER_URL + environment.CATEGORIES_URL
  }`;

  getCategories(): Observable<ApiResponse> {
    return this.apiRequest.get<ApiResponse>(this.categoriesUrl);
  }
}
