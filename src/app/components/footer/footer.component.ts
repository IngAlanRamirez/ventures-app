import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { languageOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [
    IonIcon,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    TranslatePipe,
  ],
})
export class FooterComponent implements OnInit {
  private translationService = inject(TranslationService);
  selectedLang = signal('en');

  constructor() {
    addIcons({
      languageOutline,
    });

    // Sincronizar con el servicio de traducción
    effect(() => {
      this.selectedLang.set(this.translationService.getCurrentLanguage());
    });
  }

  ngOnInit() {
    // Establecer el idioma inicial
    this.selectedLang.set(this.translationService.getCurrentLanguage());
  }

  onLanguageChange(language: string) {
    this.translationService.setLanguage(language);
    this.selectedLang.set(language);
  }
}
