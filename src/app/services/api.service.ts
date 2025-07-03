import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { CapacitorHttp } from '@capacitor/core';
import { Observable, from } from 'rxjs';

export interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  withCredentials?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private platform = inject(Platform);

  constructor() {}

  private get isMobile(): boolean {
    return this.platform.is('capacitor');
  }

  private formatHeaders(
    headers?: HttpHeaders | { [header: string]: string | string[] }
  ): { [key: string]: string } {
    if (!headers) return {};

    if (headers instanceof HttpHeaders) {
      const formatted: { [key: string]: string } = {};
      headers.keys().forEach((key) => {
        formatted[key] = headers.get(key) || '';
      });
      return formatted;
    }

    const formatted: { [key: string]: string } = {};
    Object.keys(headers).forEach((key) => {
      const value = headers[key];
      formatted[key] = Array.isArray(value) ? value.join(', ') : String(value);
    });
    return formatted;
  }

  private formatParams(
    params?:
      | HttpParams
      | {
          [param: string]:
            | string
            | number
            | boolean
            | ReadonlyArray<string | number | boolean>;
        }
  ): { [key: string]: string } {
    if (!params) return {};

    if (params instanceof HttpParams) {
      const formatted: { [key: string]: string } = {};
      params.keys().forEach((key) => {
        formatted[key] = params.get(key) || '';
      });
      return formatted;
    }

    const formatted: { [key: string]: string } = {};
    Object.keys(params).forEach((key) => {
      const value = params[key];
      formatted[key] = Array.isArray(value) ? value.join(', ') : String(value);
    });
    return formatted;
  }

  get<T>(url: string, options?: HttpOptions): Observable<T> {
    if (this.isMobile) {
      return from(
        CapacitorHttp.get({
          url,
          headers: this.formatHeaders(options?.headers),
          params: this.formatParams(options?.params),
        }).then((response) => response.data as T)
      );
    }
    return this.http.get<T>(url, options);
  }

  post<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    if (this.isMobile) {
      return from(
        CapacitorHttp.post({
          url,
          headers: this.formatHeaders(options?.headers),
          data: body,
        }).then((response) => response.data as T)
      );
    }
    return this.http.post<T>(url, body, options);
  }

  put<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    if (this.isMobile) {
      return from(
        CapacitorHttp.put({
          url,
          headers: this.formatHeaders(options?.headers),
          data: body,
        }).then((response) => response.data as T)
      );
    }
    return this.http.put<T>(url, body, options);
  }

  delete<T>(url: string, options?: HttpOptions): Observable<T> {
    if (this.isMobile) {
      return from(
        CapacitorHttp.delete({
          url,
          headers: this.formatHeaders(options?.headers),
          params: this.formatParams(options?.params),
        }).then((response) => response.data as T)
      );
    }
    return this.http.delete<T>(url, options);
  }
}
