import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BrandsService } from '../../services/brands.service';
import * as BrandsActions from './brands.actions';
import * as CategoriesActions from '../categories/categories.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BrandsEffects {
  // Effect que escucha cuando se selecciona una categoría
  loadBrandsOnCategorySelection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.selectCategory),
      map(({ category }) => {
        console.log('🏷️ BrandsEffects: Category selected, loading brands for:', category);
        console.log('🔢 Loading brands for categoryId:', category.idMenu);
        return BrandsActions.loadBrandsByCategory({ categoryId: category.idMenu });
      })
    )
  );

  // Effect que carga las marcas por categoría
  loadBrandsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrandsActions.loadBrandsByCategory),
      mergeMap(({ categoryId }) => {
        console.log('📦 BrandsEffects: loadBrandsByCategory action received for categoryId:', categoryId);
        return this.brandsService.getBrandsByCategory(categoryId).pipe(
          map((data: any) => {
            console.log('✅ BrandsEffects: Brands API response received:', data);
            const brands = (data.marcas || []).map((brand: any) => ({
              ...brand,
              nombreMarca: brand.nombreMarca || brand.nombre || '',
              descripcion: brand.descripcion || brand.descripción || '',
              imagen: brand.imagen || brand.logo || '',
            }));
            console.log('📏 BrandsEffects: Brands processed:', brands.length, 'brands');
            console.log('🚀 BrandsEffects: Dispatching loadBrandsByCategorySuccess');
            return BrandsActions.loadBrandsByCategorySuccess({ brands });
          }),
          catchError((error) => {
            console.error('❌ BrandsEffects: API error:', error);
            console.log('🚀 BrandsEffects: Dispatching loadBrandsByCategoryFailure');
            return of(BrandsActions.loadBrandsByCategoryFailure({ error }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private brandsService: BrandsService
  ) {}
}
