import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { CategoriaMenu } from '../models/categoria-menu';
import { MarcaMenu } from '../models/marca-menu';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  private mockCategories: CategoriaMenu[] = [
    {
      idMenu: 1,
      descripcion: 'Smartphones',
      isActive: true
    },
    {
      idMenu: 2,
      descripcion: 'Laptops',
      isActive: true
    },
    {
      idMenu: 3,
      descripcion: 'Tablets',
      isActive: true
    },
    {
      idMenu: 4,
      descripcion: 'Accesorios',
      isActive: true
    },
    {
      idMenu: 5,
      descripcion: 'Audio',
      isActive: true
    },
    {
      idMenu: 6,
      descripcion: 'Gaming',
      isActive: true
    }
  ];

  private mockBrands = {
    all: [
      { idItem: 1, nombreMarca: 'Apple', descripcion: 'Innovación y diseño', imagen: 'https://via.placeholder.com/150x100/007bff/ffffff?text=Apple' },
      { idItem: 2, nombreMarca: 'Samsung', descripcion: 'Tecnología avanzada', imagen: 'https://via.placeholder.com/150x100/28a745/ffffff?text=Samsung' },
      { idItem: 3, nombreMarca: 'Dell', descripcion: 'Computadoras confiables', imagen: 'https://via.placeholder.com/150x100/ffc107/ffffff?text=Dell' },
      { idItem: 4, nombreMarca: 'HP', descripcion: 'Impresión y cómputo', imagen: 'https://via.placeholder.com/150x100/dc3545/ffffff?text=HP' },
      { idItem: 5, nombreMarca: 'iPad', descripcion: 'Tablets premium', imagen: 'https://via.placeholder.com/150x100/6c757d/ffffff?text=iPad' },
      { idItem: 6, nombreMarca: 'Sony', descripcion: 'Audio profesional', imagen: 'https://via.placeholder.com/150x100/e83e8c/ffffff?text=Sony' },
      { idItem: 7, nombreMarca: 'Nintendo', descripcion: 'Gaming diversión', imagen: 'https://via.placeholder.com/150x100/17a2b8/ffffff?text=Nintendo' },
      { idItem: 8, nombreMarca: 'Microsoft', descripcion: 'Software y hardware', imagen: 'https://via.placeholder.com/150x100/6f42c1/ffffff?text=Microsoft' }
    ],
    byCategory: {
      1: [
        { idItem: 1, nombreMarca: 'Apple', descripcion: 'iPhones premium', imagen: 'https://via.placeholder.com/150x100/007bff/ffffff?text=Apple' },
        { idItem: 2, nombreMarca: 'Samsung', descripcion: 'Galaxy series', imagen: 'https://via.placeholder.com/150x100/28a745/ffffff?text=Samsung' }
      ],
      2: [
        { idItem: 3, nombreMarca: 'Dell', descripcion: 'Laptops empresariales', imagen: 'https://via.placeholder.com/150x100/ffc107/ffffff?text=Dell' },
        { idItem: 4, nombreMarca: 'HP', descripcion: 'Portátiles versátiles', imagen: 'https://via.placeholder.com/150x100/dc3545/ffffff?text=HP' }
      ],
      3: [
        { idItem: 5, nombreMarca: 'iPad', descripcion: 'Tablets Apple', imagen: 'https://via.placeholder.com/150x100/6c757d/ffffff?text=iPad' }
      ],
      5: [
        { idItem: 6, nombreMarca: 'Sony', descripcion: 'Audifonos premium', imagen: 'https://via.placeholder.com/150x100/e83e8c/ffffff?text=Sony' }
      ],
      6: [
        { idItem: 7, nombreMarca: 'Nintendo', descripcion: 'Consolas portátiles', imagen: 'https://via.placeholder.com/150x100/17a2b8/ffffff?text=Nintendo' },
        { idItem: 8, nombreMarca: 'Microsoft', descripcion: 'Xbox gaming', imagen: 'https://via.placeholder.com/150x100/6f42c1/ffffff?text=Microsoft' }
      ]
    }
  };

  getCategories(): Observable<ApiResponse> {
    console.log('🎭 Using mock categories data for GitHub Pages');
    return of({
      error: false,
      codigo: '200',
      message: 'Mock data loaded successfully',
      categorias: this.mockCategories
    });
  }

  getBrands(): Observable<ApiResponse> {
    console.log('🎭 Using mock brands data for GitHub Pages');
    return of({
      error: false,
      codigo: '200',
      message: 'Mock data loaded successfully',
      marcas: this.mockBrands.all
    });
  }

  getBrandsByCategory(categoryId: number): Observable<ApiResponse> {
    console.log(`🎭 Using mock brands data for category ${categoryId}`);
    const brands = this.mockBrands.byCategory[categoryId as keyof typeof this.mockBrands.byCategory] || [];
    return of({
      error: false,
      codigo: '200',
      message: 'Mock data loaded successfully',
      marcas: brands
    });
  }
}
