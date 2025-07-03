import { createReducer, on } from '@ngrx/store';
import * as CategoriesActions from './categories.actions';
import { CategoriaMenu } from '../../models/categoria-menu';

export interface CategoriesState {
  categories: CategoriaMenu[];
  selectedCategory: CategoriaMenu | null;
  loading: boolean;
  error: any;
}

export const initialState: CategoriesState = {
  categories: [],
  selectedCategory: null,
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
    selectedCategory: categories.length > 0 ? categories[0] : null,
    loading: false,
    error: null,
  })),
  on(CategoriesActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CategoriesActions.selectCategory, (state, { category }) => ({
    ...state,
    categories: state.categories.map((cat) => ({
      ...cat,
      isActive: cat.idMenu === category.idMenu,
    })),
    selectedCategory: { ...category, isActive: true },
  })),
  on(CategoriesActions.selectDefaultCategory, (state) => {
    const firstCategory =
      state.categories.length > 0 ? state.categories[0] : null;
    return {
      ...state,
      categories: state.categories.map((cat, index) => ({
        ...cat,
        isActive: index === 0,
      })),
      selectedCategory: firstCategory
        ? { ...firstCategory, isActive: true }
        : null,
    };
  })
);
