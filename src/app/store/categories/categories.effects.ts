import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesService } from '../../services/categories.service';
import * as CategoriesActions from './categories.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriesEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      mergeMap(() =>
        this.categoriesService.getCategories().pipe(
          map((data: any) => {
            const categories = (data.categorias || []).map((cat: any) => ({
              ...cat,
              descripcion: cat.descripcion || cat.descripción || '',
              isActive: false, // Inicialmente ninguna está activa
            }));
            return CategoriesActions.loadCategoriesSuccess({ categories });
          }),
          catchError((error) =>
            of(CategoriesActions.loadCategoriesFailure({ error }))
          )
        )
      )
    )
  );

  // Effect para seleccionar automáticamente la primera categoría
  selectFirstCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategoriesSuccess),
      map(({ categories }) => {
        if (categories.length > 0) {
          return CategoriesActions.selectCategory({ category: categories[0] });
        }
        return { type: 'NO_ACTION' };
      })
    )
  );

  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService
  ) {}
}
