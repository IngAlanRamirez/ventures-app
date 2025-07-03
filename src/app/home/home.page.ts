import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { TableComponent } from '../components/table/table.component';
import { MenuComponent } from '../components/menu/menu.component';
import { CouponComponent } from '../components/coupon/coupon.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonContent,
    HeaderComponent,
    TableComponent,
    MenuComponent,
    CouponComponent,
  ],
})
export class HomePage {
  constructor() {}
}
