import { Component, OnInit, inject, computed } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, chevronForwardOutline } from 'ionicons/icons';
import { IonIcon, IonButton } from '@ionic/angular/standalone';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface FeatureRow {
  featureKey: string;
  noCardRequired: boolean;
  cardLinked: boolean;
}

const FEATURES: FeatureRow[] = [
  {
    featureKey: 'table.features.instantCoupons',
    noCardRequired: true,
    cardLinked: true,
  },
  {
    featureKey: 'table.features.visaBenefits',
    noCardRequired: false,
    cardLinked: true,
  },
  {
    featureKey: 'table.features.cashbackTracking',
    noCardRequired: false,
    cardLinked: true,
  },
  {
    featureKey: 'table.features.merchantLocation',
    noCardRequired: false,
    cardLinked: true,
  },
  {
    featureKey: 'table.features.cashbackOffers',
    noCardRequired: false,
    cardLinked: true,
  },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [IonButton, IonIcon, MatTableModule, TranslatePipe],
})
export class TableComponent implements OnInit {
  private translationService = inject(TranslationService);
  displayedColumns: string[] = ['feature', 'noCardRequired', 'cardLinked'];
  dataSource = new MatTableDataSource(FEATURES);

  constructor() {
    addIcons({ checkmarkCircleOutline, chevronForwardOutline });
  }

  ngOnInit() {}

  // Método para obtener traducción de feature
  getFeatureTranslation(featureKey: string): string {
    return this.translationService.translate(featureKey);
  }
}
