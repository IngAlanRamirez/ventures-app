import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { CategoriesService } from '../../services/categories.service';
import { BrandsService } from '../../services/brands.service';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-debug',
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title>🐛 Debug Component</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-button (click)="testCategories()" fill="outline" color="primary">
          Test Categories API
        </ion-button>
        <ion-button (click)="testBrands()" fill="outline" color="secondary">
          Test Brands API
        </ion-button>
        <ion-button (click)="testMockData()" fill="outline" color="success">
          Test Mock Data
        </ion-button>
        
        <div *ngIf="debugInfo" class="debug-info">
          <h4>Debug Info:</h4>
          <pre>{{ debugInfo | json }}</pre>
        </div>
        
        <div *ngIf="errors.length > 0" class="errors">
          <h4>Errors:</h4>
          <div *ngFor="let error of errors" class="error-item">
            {{ error }}
          </div>
        </div>
      </ion-card-content>
    </ion-card>
  `,
  styles: [`
    .debug-info {
      margin-top: 16px;
      padding: 12px;
      background: #f4f4f4;
      border-radius: 8px;
      max-height: 300px;
      overflow: auto;
    }
    
    .errors {
      margin-top: 16px;
      padding: 12px;
      background: #fee;
      border-radius: 8px;
    }
    
    .error-item {
      color: #d00;
      margin-bottom: 8px;
    }
    
    pre {
      white-space: pre-wrap;
      font-size: 12px;
    }
  `],
  imports: [CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton]
})
export class DebugComponent implements OnInit {
  private categoriesService = inject(CategoriesService);
  private brandsService = inject(BrandsService);
  private mockDataService = inject(MockDataService);
  
  debugInfo: any = null;
  errors: string[] = [];
  
  ngOnInit() {
    console.log('🐛 Debug Component initialized');
  }
  
  testCategories() {
    console.log('🧪 Testing Categories API...');
    this.errors = [];
    this.debugInfo = null;
    
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        console.log('✅ Categories API Success:', data);
        this.debugInfo = {
          type: 'Categories API',
          success: true,
          data: data,
          count: data.categorias?.length || 0
        };
      },
      error: (error) => {
        console.error('❌ Categories API Error:', error);
        this.errors.push(`Categories API Error: ${error.message || error}`);
        this.debugInfo = {
          type: 'Categories API',
          success: false,
          error: error
        };
      }
    });
  }
  
  testBrands() {
    console.log('🧪 Testing Brands API...');
    this.errors = [];
    this.debugInfo = null;
    
    this.brandsService.getBrands().subscribe({
      next: (data) => {
        console.log('✅ Brands API Success:', data);
        this.debugInfo = {
          type: 'Brands API',
          success: true,
          data: data,
          count: data.marcas?.length || 0
        };
      },
      error: (error) => {
        console.error('❌ Brands API Error:', error);
        this.errors.push(`Brands API Error: ${error.message || error}`);
        this.debugInfo = {
          type: 'Brands API',
          success: false,
          error: error
        };
      }
    });
  }
  
  testMockData() {
    console.log('🧪 Testing Mock Data...');
    this.errors = [];
    this.debugInfo = null;
    
    this.mockDataService.getCategories().subscribe({
      next: (data) => {
        console.log('✅ Mock Categories Success:', data);
        this.debugInfo = {
          type: 'Mock Categories',
          success: true,
          data: data,
          count: data.categorias?.length || 0
        };
      },
      error: (error) => {
        console.error('❌ Mock Data Error:', error);
        this.errors.push(`Mock Data Error: ${error.message || error}`);
        this.debugInfo = {
          type: 'Mock Data',
          success: false,  
          error: error
        };
      }
    });
  }
}
