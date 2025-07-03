import { Component, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { languageOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [IonIcon, MatFormFieldModule, MatSelectModule, MatOptionModule],
})
export class FooterComponent implements OnInit {
  selectedLang = 'en';

  constructor() {
    addIcons({
      languageOutline,
    });
  }

  ngOnInit() {}
}
