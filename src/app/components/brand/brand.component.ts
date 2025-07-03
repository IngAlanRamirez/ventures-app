import { Component, inject, signal, effect, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonIcon, IonButton } from '@ionic/angular/standalone';
import { CouponComponent } from '../coupon/coupon.component';
import { addIcons } from 'ionicons';
import {
  listOutline,
  gridOutline,
  chevronForwardOutline,
} from 'ionicons/icons';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { MarcaMenu } from '../../models/marca-menu';
import * as BrandsSelectors from '../../store/brands/brands.selectors';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
  imports: [
    IonButton,
    IonIcon,
    CouponComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
  ],
})
export class BrandComponent {
  private store = inject(Store);
  brands = signal<MarcaMenu[]>([]);
  loading = signal(false);
  error = signal<any>(null);
  sortBy = signal('nombreMarca');
  sortOrder = signal('asc');

  // Computed signal para obtener el valor actual del select
  currentSortValue = computed(() => {
    return `${this.sortBy()}-${this.sortOrder()}`;
  });

  // Estado para controlar cuántos elementos mostrar
  private readonly initialDisplayCount = 7;
  showAll = signal(false);

  // Computed signal para obtener las marcas a mostrar (ordenadas)
  displayedBrands = computed(() => {
    const allBrands = [...this.brands()]; // Crear copia para no mutar el original

    // Determinar qué elementos mostrar primero
    let brandsToSort: MarcaMenu[];
    if (this.showAll() || allBrands.length <= this.initialDisplayCount) {
      // Mostrar todos los elementos
      brandsToSort = allBrands;
    } else {
      // Mostrar solo los primeros 7 elementos (sin ordenar aún)
      brandsToSort = allBrands.slice(0, this.initialDisplayCount);
    }

    // Ordenar los elementos seleccionados
    const sortedBrands = brandsToSort.sort((a, b) => {
      let valueA: string;
      let valueB: string;

      if (this.sortBy() === 'nombreMarca') {
        valueA = a.nombreMarca.toLowerCase();
        valueB = b.nombreMarca.toLowerCase();
      } else {
        valueA = a.descripcion.toLowerCase();
        valueB = b.descripcion.toLowerCase();
      }

      if (this.sortOrder() === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });

    return sortedBrands;
  });

  // Computed signal para saber si hay más elementos
  hasMore = computed(() => {
    return this.brands().length > this.initialDisplayCount && !this.showAll();
  });

  constructor() {
    addIcons({ listOutline, gridOutline, chevronForwardOutline });

    effect(() => {
      const newBrands = this.store.selectSignal(BrandsSelectors.selectBrands)();

      // Si cambian las marcas, resetear el estado showAll
      if (JSON.stringify(this.brands()) !== JSON.stringify(newBrands)) {
        this.showAll.set(false);
      }

      this.brands.set(newBrands);
      this.loading.set(
        this.store.selectSignal(BrandsSelectors.selectBrandsLoading)()
      );
      this.error.set(
        this.store.selectSignal(BrandsSelectors.selectBrandsError)()
      );
    });
  }

  // Método para mostrar todas las marcas
  showAllBrands() {
    this.showAll.set(true);
  }

  // Método para cambiar el criterio de ordenamiento
  onSortChange(sortValue: string) {
    const [field, order] = sortValue.split('-');
    this.sortBy.set(field);
    this.sortOrder.set(order);
  }
}
