import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesService } from '../../services/categories.service';
import * as CategoriesActions from './categories.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriesEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      mergeMap(() =>
        this.categoriesService.getCategories().pipe(
          map((data: any) => {
            const categories = (data.categorias || []).map(
              (cat: any, index: number) => ({
                ...cat,
                descripcion: cat.descripcion || cat.descripción || '',
                isActive: index === 0, // Solo la primera categoría está activa inicialmente
              })
            );
            return CategoriesActions.loadCategoriesSuccess({ categories });
          }),
          catchError((error) =>
            of(CategoriesActions.loadCategoriesFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService
  ) {}
}
