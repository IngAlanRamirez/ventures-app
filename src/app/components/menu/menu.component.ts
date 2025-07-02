import { Component, OnInit } from '@angular/core';
import { IonTitle, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [IonTitle, IonButton],
  standalone: true,
})
export class MenuComponent implements OnInit {
  categories = [
    'Featured',
    'Restaurants',
    'Travel',
    'Fuel',
    'Services',
    'Gifts & Entertainment',
    'Shopping',
    'Electronics',
    'Software',
    'Health & Beauty',
    'Office Supplies',
    'Automotive',
  ];
  activeCategory = this.categories[0];

  constructor() {}

  ngOnInit() {}

  setActiveCategory(category: string) {
    this.activeCategory = category;
  }
}
