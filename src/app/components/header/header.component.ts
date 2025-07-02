import { Component, OnInit } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonButton, IonIcon],
})
export class HeaderComponent implements OnInit {
  constructor() {
    addIcons({
      chevronForwardOutline,
    });
  }

  ngOnInit() {}
}
