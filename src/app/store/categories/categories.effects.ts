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
      mergeMap(() => {
        return this.categoriesService.getCategories().pipe(
          map((data: any) => {
            // La API devuelve menuItems en lugar de categorias
            const rawCategories = data.menuItems || data.categorias || [];
            
            const categories = rawCategories.map((cat: any) => ({
              idMenu: cat.idMenu,
              descripcion: cat.descripción || cat.descripcion || '',
              isActive: false, // Inicialmente ninguna está activa
            }));
            
            return CategoriesActions.loadCategoriesSuccess({ categories });
          }),
          catchError((error) => {
            return of(CategoriesActions.loadCategoriesFailure({ error }));
          })
        );
      })
    )
  );

  // Effect para seleccionar automáticamente la primera categoría
  selectFirstCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategoriesSuccess),
      map(({ categories }) => {
        console.log('🎆 CategoriesEffects: loadCategoriesSuccess received, auto-selecting first category');
        console.log('📊 Categories received:', categories);
        if (categories.length > 0) {
          console.log('🎯 Selecting first category:', categories[0]);
          return CategoriesActions.selectCategory({ category: categories[0] });
        }
        console.log('⚠️ No categories to select');
        return { type: 'NO_ACTION' };
      })
    )
  );

  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService
  ) {}
}
