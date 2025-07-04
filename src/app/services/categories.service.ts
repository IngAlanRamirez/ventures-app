import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MockDataService } from './mock-data.service';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiRequest = inject(ApiService);
  mockData = inject(MockDataService);
  private categoriesUrl = `${
    environment.SERVER_URL + environment.CATEGORIES_URL
  }`;

  getCategories(): Observable<ApiResponse> {
    return this.apiRequest.get<ApiResponse>(this.categoriesUrl).pipe(
      catchError((error) => {
        console.warn('⚠️ Categories API failed, using mock data:', error);
        return this.mockData.getCategories();
      })
    );
  }
}
