import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { categoriesReducer } from './store/categories/categories.reducer';

export const appConfig = [
  provideState({ name: 'categories', reducer: categoriesReducer }),
  provideEffects([]),
];
