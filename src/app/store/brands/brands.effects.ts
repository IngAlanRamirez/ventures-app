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
        return BrandsActions.loadBrandsByCategory({ categoryId: category.idMenu });
      })
    )
  );

  // Effect que carga las marcas por categoría
  loadBrandsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrandsActions.loadBrandsByCategory),
      mergeMap(({ categoryId }) => {
        return this.brandsService.getBrandsByCategory(categoryId).pipe(
          map((data: any) => {
            const rawBrands = data.menuItems || data.marcas || [];
            const brands = rawBrands.map((brand: any) => ({
              idItem: brand.idItem,
              nombreMarca: brand.nombreMarca || brand.nombre || '',
              descripcion: brand.descripcion || brand.descripción || '',
              imagen: brand.imagen || brand.logo || '',
            }));
            return BrandsActions.loadBrandsByCategorySuccess({ brands });
          }),
          catchError((error) => {
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
