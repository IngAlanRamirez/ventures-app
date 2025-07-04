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
        console.log('📦 CategoriesEffects: loadCategories action received');
        return this.categoriesService.getCategories().pipe(
          map((data: any) => {
            console.log('✅ CategoriesEffects: API response received:', data);
            console.log('🔍 Full API response structure:', JSON.stringify(data, null, 2));
            
            // La API devuelve menuItems en lugar de categorias
            const rawCategories = data.menuItems || data.categorias || [];
            console.log('🔢 Raw categories extracted:', rawCategories);
            console.log('📏 Raw categories length:', rawCategories.length);
            
            if (rawCategories.length > 0) {
              console.log('🔎 First raw category:', rawCategories[0]);
              console.log('🔑 First category keys:', Object.keys(rawCategories[0]));
            }
            
            const categories = rawCategories.map((cat: any, index: number) => {
              console.log(`🏷️ Processing category ${index}:`, cat);
              const mapped = {
                idMenu: cat.idMenu,
                descripcion: cat.descripción || cat.descripcion || '',
                isActive: false, // Inicialmente ninguna está activa
              };
              console.log(`➡️ Mapped category ${index}:`, mapped);
              return mapped;
            });
            
            console.log('📊 CategoriesEffects: Categories processed:', categories);
            console.log('📏 Final categories length:', categories.length);
            console.log('🚀 CategoriesEffects: Dispatching loadCategoriesSuccess');
            return CategoriesActions.loadCategoriesSuccess({ categories });
          }),
          catchError((error) => {
            console.error('❌ CategoriesEffects: API error:', error);
            console.log('🚀 CategoriesEffects: Dispatching loadCategoriesFailure');
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
