import { Component, Input, OnInit, inject } from '@angular/core';
import { IonTitle, IonButton } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { CategoriaMenu } from 'src/app/models/categoria-menu';
import * as CategoriesActions from 'src/app/store/categories/categories.actions';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [IonTitle, IonButton, TranslatePipe],
})
export class MenuComponent implements OnInit {
  @Input() categories: CategoriaMenu[] = [];
  private store = inject(Store);

  constructor() {}

  ngOnInit() {}

  onCategoryClick(category: CategoriaMenu) {
    this.store.dispatch(CategoriesActions.selectCategory({ category }));
  }
}
