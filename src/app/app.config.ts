import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { categoriesReducer } from './store/categories/categories.reducer';
import { CategoriesEffects } from './store/categories/categories.effects';
import { brandsReducer } from './store/brands/brands.reducer';
import { BrandsEffects } from './store/brands/brands.effects';

export const appConfig = [
  provideStore(),
  provideState({ name: 'categories', reducer: categoriesReducer }),
  provideState({ name: 'brands', reducer: brandsReducer }),
  provideEffects([CategoriesEffects, BrandsEffects]),
];
