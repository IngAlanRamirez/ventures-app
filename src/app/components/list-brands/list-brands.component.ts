import {
  Component,
  inject,
  OnInit,
  signal,
  effect,
  computed,
} from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';
import { CouponComponent } from '../coupon/coupon.component';
import { Store } from '@ngrx/store';
import { MarcaMenu } from '../../models/marca-menu';
import * as BrandsSelectors from '../../store/brands/brands.selectors';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrls: ['./list-brands.component.scss'],
  imports: [IonButton, IonIcon, CouponComponent, TranslatePipe],
})
export class ListBrandsComponent implements OnInit {
  private store = inject(Store);
  allBrands = signal<MarcaMenu[]>([]);
  randomBrands = signal<MarcaMenu[]>([]);

  // Función para generar selección aleatoria estable
  private generateRandomBrands(brands: MarcaMenu[]): MarcaMenu[] {
    // Filtrar marcas que tienen imagen
    const brandsWithImage = brands.filter(
      (brand) => brand.imagen && brand.imagen.trim() !== ''
    );

    // Si hay menos de 4 marcas con imagen, devolver las que hay
    if (brandsWithImage.length <= 4) {
      return brandsWithImage;
    }

    // Seleccionar 4 aleatorias usando Fisher-Yates shuffle
    const shuffled = [...brandsWithImage];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 4);
  }

  constructor() {
    addIcons({ chevronForwardOutline });

    effect(() => {
      const newBrands = this.store.selectSignal(BrandsSelectors.selectBrands)();
      const loading = this.store.selectSignal(BrandsSelectors.selectBrandsLoading)();
      const error = this.store.selectSignal(BrandsSelectors.selectBrandsError)();
      
      console.log('🏪 ListBrandsComponent Effect - Store State:', {
        brands: newBrands,
        brandsLength: newBrands?.length || 0,
        loading,
        error
      });

      // Si las marcas cambiaron, actualizar y generar nueva selección aleatoria
      if (JSON.stringify(this.allBrands()) !== JSON.stringify(newBrands)) {
        console.log('🔄 ListBrandsComponent: Brands changed, updating signals');
        console.log('📊 Old brands:', this.allBrands());
        console.log('🆕 New brands:', newBrands);
        
        this.allBrands.set(newBrands);
        const randomSelection = this.generateRandomBrands(newBrands);
        this.randomBrands.set(randomSelection);
        
        console.log('🎲 Random brands generated:', randomSelection);
        console.log('📊 Final signals state:', {
          allBrands: this.allBrands(),
          randomBrands: this.randomBrands()
        });
      }
    });
  }

  ngOnInit() {}
}
