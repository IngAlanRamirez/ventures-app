import { Component, OnInit } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';
import { CouponComponent } from '../coupon/coupon.component';

@Component({
  selector: 'app-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrls: ['./list-brands.component.scss'],
  imports: [IonButton, IonIcon, CouponComponent],
})
export class ListBrandsComponent implements OnInit {
  brands = [
    {
      logo: 'https://example.com/logo1.png',
      brand: 'Brand 1',
      title: 'Exclusive Offer 1',
      subtitle: 'Brand 1 Subtitle',
      action: 'Get Offer',
    },
    {
      logo: 'https://example.com/logo2.png',
      brand: 'Brand 2',
      title: 'Exclusive Offer 2',
      subtitle: 'Brand 2 Subtitle',
      action: 'Get Offer',
    },
    {
      logo: 'https://example.com/logo3.png',
      brand: 'Brand 3',
      title: 'Exclusive Offer 3',
      subtitle: 'Brand 3 Subtitle',
      action: 'Get Offer',
    },
    {
      logo: 'https://example.com/logo4.png',
      brand: 'Brand 4',
      title: 'Exclusive Offer 4',
      subtitle: 'Brand 4 Subtitle',
      action: 'Get Offer',
    },
  ];

  constructor() {
    addIcons({ chevronForwardOutline }); // Add any necessary icons here
  }

  ngOnInit() {}
}
