import { Component, inject, signal, effect } from '@angular/core';
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

  constructor() {
    addIcons({ listOutline, gridOutline, chevronForwardOutline });

    effect(() => {
      this.brands.set(this.store.selectSignal(BrandsSelectors.selectBrands)());
      this.loading.set(
        this.store.selectSignal(BrandsSelectors.selectBrandsLoading)()
      );
      this.error.set(
        this.store.selectSignal(BrandsSelectors.selectBrandsError)()
      );
    });
  }
}
