import { Component } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { CouponComponent } from '../coupon/coupon.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
  imports: [IonIcon, CouponComponent],
  standalone: true,
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
}
