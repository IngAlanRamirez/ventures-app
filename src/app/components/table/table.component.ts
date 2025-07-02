import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, chevronForwardOutline } from 'ionicons/icons';
import { IonIcon, IonButton } from '@ionic/angular/standalone';

interface FeatureRow {
  feature: string;
  noCardRequired: boolean;
  cardLinked: boolean;
}

const FEATURES: FeatureRow[] = [
  { feature: 'Instant Coupons', noCardRequired: true, cardLinked: true },
  {
    feature: 'Full access to Visa Savings Edge benefits',
    noCardRequired: false,
    cardLinked: true,
  },
  { feature: 'Cashback tracking', noCardRequired: false, cardLinked: true },
  {
    feature: 'Merchant location search',
    noCardRequired: false,
    cardLinked: true,
  },
  { feature: 'Cashback offers', noCardRequired: false, cardLinked: true },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [IonButton, IonIcon, MatTableModule],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['feature', 'noCardRequired', 'cardLinked'];
  dataSource = new MatTableDataSource(FEATURES);

  constructor() {
    addIcons({ checkmarkCircleOutline, chevronForwardOutline });
  }

  ngOnInit() {}
}
