import { Component, inject, signal, computed, effect } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { TableComponent } from '../components/table/table.component';
import { MenuComponent } from '../components/menu/menu.component';
import { BrandComponent } from '../components/brand/brand.component';
import { ListBrandsComponent } from '../components/list-brands/list-brands.component';
import { FooterComponent } from '../components/footer/footer.component';

import { Store } from '@ngrx/store';
import { CategoriaMenu } from '../models/categoria-menu';
import * as CategoriesActions from '../store/categories/categories.actions';
import * as CategoriesSelectors from '../store/categories/categories.selectors';

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
  private store = inject(Store);
  categories = signal<CategoriaMenu[]>([]);
  selectedCategory = signal<CategoriaMenu | null>(null);
  loading = signal(false);
  error = signal<any>(null);

  constructor() {
    effect(() => {
      const storeCategories = this.store.selectSignal(CategoriesSelectors.selectCategories)();
      const selectedCategory = this.store.selectSignal(CategoriesSelectors.selectSelectedCategory)();
      const loading = this.store.selectSignal(CategoriesSelectors.selectCategoriesLoading)();
      const error = this.store.selectSignal(CategoriesSelectors.selectCategoriesError)();
      
      this.categories.set(storeCategories);
      this.selectedCategory.set(selectedCategory);
      this.loading.set(loading);
      this.error.set(error);
    });
  }

  ionViewWillEnter() {
    this.store.dispatch(CategoriesActions.loadCategories());
  }

  selectCategory(category: CategoriaMenu) {
    this.store.dispatch(CategoriesActions.selectCategory({ category }));
  }
}
