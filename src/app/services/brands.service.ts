import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  apiRequest = inject(ApiService);
  private brandsUrl = `${environment.SERVER_URL + environment.BRANDS_URL}`;

  constructor() {}

  getBrands(): Observable<ApiResponse> {
    return this.apiRequest.get<ApiResponse>(this.brandsUrl);
  }

  getBrandsByCategory(categoryId: number): Observable<ApiResponse> {
    const url = `${this.brandsUrl}/${categoryId}`;
    return this.apiRequest.get<ApiResponse>(url);
  }
}
