import { Component, inject } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { TableComponent } from '../components/table/table.component';
import { MenuComponent } from '../components/menu/menu.component';
import { BrandComponent } from '../components/brand/brand.component';
import { ListBrandsComponent } from '../components/list-brands/list-brands.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CategoriesService } from '../services/categories.service';
import { CategoriaMenu } from '../models/categoria-menu';
import { ApiResponse } from '../models/api-response';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonContent,
    HeaderComponent,
    TableComponent,
    MenuComponent,
    BrandComponent,
    ListBrandsComponent,
    FooterComponent,
  ],
})
export class HomePage {
  apiCategories = inject(CategoriesService);
  categories: CategoriaMenu[] = [];
  constructor() {}

  ionViewWillEnter() {
    console.log('HomePage: ionViewWillEnter');
    this.loadCategories();
  }

  loadCategories() {
    this.apiCategories.getCategories().subscribe(
      (data: ApiResponse) => {
        if (data.categorias && data.categorias.length > 0) {
          this.categories = data.categorias.map((cat: any) => ({
            ...cat,
            descripcion: cat.descripcion || cat.descripción || '',
          }));
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this.categories = [];
      }
    );
  }
}
