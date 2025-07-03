import { createAction, props } from '@ngrx/store';
import { MarcaMenu } from '../../models/marca-menu';

export const loadBrandsByCategory = createAction(
  '[Brands] Load Brands By Category',
  props<{ categoryId: number }>()
);

export const loadBrandsByCategorySuccess = createAction(
  '[Brands] Load Brands By Category Success',
  props<{ brands: MarcaMenu[] }>()
);

export const loadBrandsByCategoryFailure = createAction(
  '[Brands] Load Brands By Category Failure',
  props<{ error: any }>()
);

export const clearBrands = createAction('[Brands] Clear Brands');
