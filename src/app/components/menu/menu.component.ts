import { Component, Input, OnInit } from '@angular/core';
import { IonTitle, IonButton } from '@ionic/angular/standalone';
import { CategoriaMenu } from 'src/app/models/categoria-menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [IonTitle, IonButton],
})
export class MenuComponent implements OnInit {
  @Input() categories: CategoriaMenu[] = [];
  activeCategory = this.categories[0]?.descripcion || '';

  constructor() {}

  ngOnInit() {}

  setActiveCategory(category: string) {
    this.activeCategory = category;
  }
}
