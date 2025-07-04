import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MockDataService } from './mock-data.service';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  apiRequest = inject(ApiService);
  mockData = inject(MockDataService);
  private brandsUrl = `${environment.SERVER_URL + environment.BRANDS_URL}`;

  constructor() {}

  getBrands(): Observable<ApiResponse> {
    return this.apiRequest.get<ApiResponse>(this.brandsUrl).pipe(
      catchError((error) => {
        console.warn('⚠️ API failed, using mock data:', error);
        return this.mockData.getBrands();
      })
    );
  }

  getBrandsByCategory(categoryId: number): Observable<ApiResponse> {
    const url = `${this.brandsUrl}?idMenu=${categoryId}`;
    return this.apiRequest.get<ApiResponse>(url).pipe(
      catchError((error) => {
        return this.mockData.getBrandsByCategory(categoryId);
      })
    );
  }
}
