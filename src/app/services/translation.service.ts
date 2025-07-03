import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

export interface TranslationData {
  [key: string]: string | TranslationData;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLanguage = signal<string>('en');
  private translations = signal<{ [language: string]: TranslationData }>({});
  private httpClient = inject(HttpClient);
  private isLoaded = signal<boolean>(false);

  // Computed signal para obtener las traducciones del idioma actual
  currentTranslations = computed(() => {
    return this.translations()[this.currentLanguage()] || {};
  });

  constructor() {
    // Cargar idioma guardado del localStorage
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    this.currentLanguage.set(savedLang);
    this.loadTranslations();
  }

  // Obtener idioma actual
  getCurrentLanguage() {
    return this.currentLanguage();
  }

  // Cambiar idioma
  setLanguage(language: string) {
    this.currentLanguage.set(language);
    localStorage.setItem('selectedLanguage', language);
    // Solo recargar si es necesario
    if (!this.translations()[language]) {
      this.loadTranslations();
    }
  }

  // Verificar si las traducciones están cargadas
  isTranslationsLoaded(): boolean {
    return this.isLoaded() && !!this.translations()[this.currentLanguage()];
  }

  // Obtener traducción por clave
  translate(key: string): string {
    // Si las traducciones no están cargadas, devolver la clave sin warning
    if (!this.isTranslationsLoaded()) {
      return key;
    }

    const keys = key.split('.');
    let result: any = this.currentTranslations();

    for (const k of keys) {
      result = result[k];
      if (result === undefined) {
        console.warn(
          `Translation key not found: ${key} for language: ${this.currentLanguage()}`
        );
        return key; // Devolver la clave si no se encuentra la traducción
      }
    }

    return result as string;
  }

  // Cargar traducciones desde archivos JSON
  private loadTranslations() {
    // Inicializar con traducciones por defecto como fallback
    this.setDefaultTranslations();

    const supportedLanguages = ['en', 'es'];

    const loadRequests = supportedLanguages.map((language) =>
      this.httpClient.get<TranslationData>(`/assets/i18n/${language}.json`)
    );

    forkJoin(loadRequests).subscribe({
      next: (results) => {
        const translations: { [language: string]: TranslationData } = {};
        supportedLanguages.forEach((language, index) => {
          translations[language] = results[index];
        });

        this.translations.set(translations);
        this.isLoaded.set(true);
        console.log('Translations loaded successfully');
      },
      error: (error) => {
        console.error('Error loading translations:', error);
        // Mantener las traducciones por defecto si hay error
        this.isLoaded.set(true);
      },
    });
  }

  // Establecer traducciones por defecto como fallback
  private setDefaultTranslations() {
    const defaultTranslations = {
      en: {
        common: { loading: 'Loading...', error: 'Error', more: 'MORE' },
        header: {
          welcome: 'Welcome back!',
          login: 'LOGIN',
          linkCard: 'LINK YOUR CARD',
        },
        menu: { title: 'Explore Instant Coupons' },
        brand: { title: 'Featured Instant Coupons', sortBy: 'Sort By' },
        login: {
          email: 'Email',
          password: 'Password',
          login: 'Login',
          cancel: 'Cancel',
        },
      },
      es: {
        common: { loading: 'Cargando...', error: 'Error', more: 'MÁS' },
        header: {
          welcome: '¡Bienvenido de nuevo!',
          login: 'INICIAR SESIÓN',
          linkCard: 'VINCULAR TARJETA',
        },
        menu: { title: 'Explora Cupones Instantáneos' },
        brand: {
          title: 'Cupones Instantáneos Destacados',
          sortBy: 'Ordenar Por',
        },
        login: {
          email: 'Correo Electrónico',
          password: 'Contraseña',
          login: 'Iniciar Sesión',
          cancel: 'Cancelar',
        },
      },
    };

    this.translations.set(defaultTranslations);
  }
}
