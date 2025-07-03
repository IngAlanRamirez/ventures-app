import { Component } from '@angular/core';
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
  coupons = [
    {
      logo: 'https://1000logos.net/wp-content/uploads/2021/05/Google-AdWords-logo.png',
      brand: 'Google Ads',
      title: 'Get $500 in Google ad spend',
      subtitle: 'Google Ads',
      action: 'Get Coupon',
    },
    {
      logo: 'https://1000logos.net/wp-content/uploads/2020/02/National-Car-Rental-Logo.png',
      brand: 'National',
      title: 'Save 5% on car rentals',
      subtitle: 'National',
      action: 'Get Coupon',
    },
    // ...agrega más objetos según la imagen...
  ];
  sortBy = 'asc';
  sortOrder = 'asc';

  constructor() {
    addIcons({ listOutline, gridOutline, chevronForwardOutline });
  }
}
