import { createAction, props } from '@ngrx/store';
import { CategoriaMenu } from '../../models/categoria-menu';

export const loadCategories = createAction('[Categories] Load Categories');

export const loadCategoriesSuccess = createAction(
  '[Categories] Load Categories Success',
  props<{ categories: CategoriaMenu[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Categories] Load Categories Failure',
  props<{ error: any }>()
);

export const selectCategory = createAction(
  '[Categories] Select Category',
  props<{ category: CategoriaMenu }>()
);

export const selectDefaultCategory = createAction(
  '[Categories] Select Default Category'
);
