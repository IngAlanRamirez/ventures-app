import { createReducer, on } from '@ngrx/store';
import * as CategoriesActions from './categories.actions';
import { CategoriaMenu } from '../../models/categoria-menu';

export interface CategoriesState {
  categories: CategoriaMenu[];
  loading: boolean;
  error: any;
}

export const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const categoriesReducer = createReducer(
  initialState,
  on(CategoriesActions.loadCategories, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CategoriesActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    loading: false,
    error: null,
  })),
  on(CategoriesActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
