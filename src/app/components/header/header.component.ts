import { Component, OnInit } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonButton, IonIcon],
})
export class HeaderComponent implements OnInit {
  constructor(private dialog: MatDialog) {
    addIcons({
      chevronForwardOutline,
    });
  }

  ngOnInit() {}

  openLoginDialog() {
    this.dialog.open(LoginComponent, {
      width: '350px',
      autoFocus: false,
    });
  }
}
