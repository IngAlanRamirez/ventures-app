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
  sortBy = 'asc';
  sortOrder = 'asc';

  // Estado para controlar cuántos elementos mostrar
  private readonly initialDisplayCount = 7;
  showAll = signal(false);

  // Computed signal para obtener las marcas a mostrar
  displayedBrands = computed(() => {
    const allBrands = this.brands();
    if (this.showAll() || allBrands.length <= this.initialDisplayCount) {
      return allBrands;
    }
    return allBrands.slice(0, this.initialDisplayCount);
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
}
