import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState } from './categories.reducer';

export const selectCategoriesState =
  createFeatureSelector<CategoriesState>('categories');

export const selectCategories = createSelector(
  selectCategoriesState,
  (state) => state.categories
);

export const selectCategoriesLoading = createSelector(
  selectCategoriesState,
  (state) => state.loading
);

export const selectCategoriesError = createSelector(
  selectCategoriesState,
  (state) => state.error
);

export const selectSelectedCategory = createSelector(
  selectCategories,
  (categories) => categories.find((cat) => cat.isActive) || null
);
