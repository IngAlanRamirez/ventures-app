import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { categoriesReducer } from './store/categories/categories.reducer';
import { CategoriesEffects } from './store/categories/categories.effects';

export const appConfig = [
  provideStore(),
  provideState({ name: 'categories', reducer: categoriesReducer }),
  provideEffects([CategoriesEffects]),
];
