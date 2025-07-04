import { createReducer, on } from '@ngrx/store';
import * as BrandsActions from './brands.actions';
import { MarcaMenu } from '../../models/marca-menu';

export interface BrandsState {
  brands: MarcaMenu[];
  selectedCategoryId: number | null;
  loading: boolean;
  error: any;
}

export const initialState: BrandsState = {
  brands: [],
  selectedCategoryId: null,
  loading: false,
  error: null,
};

export const brandsReducer = createReducer(
  initialState,
  on(BrandsActions.loadBrandsByCategory, (state, { categoryId }) => ({
    ...state,
    selectedCategoryId: categoryId,
    loading: true,
    error: null,
  })),
  on(BrandsActions.loadBrandsByCategorySuccess, (state, { brands }) => ({
    ...state,
    brands,
    loading: false,
    error: null,
  })),
  on(BrandsActions.loadBrandsByCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(BrandsActions.clearBrands, (state) => ({
    ...state,
    brands: [],
    selectedCategoryId: null,
    loading: false,
    error: null,
  }))
);
