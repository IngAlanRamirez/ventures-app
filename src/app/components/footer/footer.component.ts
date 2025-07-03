import { Component, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [IonIcon],
  standalone: true,
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
