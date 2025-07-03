import { Component, Input, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonChip,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cashOutline, arrowForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss'],
  imports: [
    IonLabel,
    IonChip,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCard,
    IonCardContent,
    IonIcon,
  ],
  standalone: true,
})
export class CouponComponent implements OnInit {
  @Input() logo = '';
  @Input() brand = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() action = '';

  constructor() {
    addIcons({ cashOutline, arrowForwardOutline });
  }

  ngOnInit() {}
}
