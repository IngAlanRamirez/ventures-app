import { Injectable, signal, computed } from '@angular/core';

export interface TranslationData {
  [key: string]: string | TranslationData;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLanguage = signal<string>('en');
  private translations = signal<{ [language: string]: TranslationData }>({});

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
  }

  // Obtener traducción por clave
  translate(key: string): string {
    const keys = key.split('.');
    let result: any = this.currentTranslations();

    for (const k of keys) {
      result = result[k];
      if (result === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key; // Devolver la clave si no se encuentra la traducción
      }
    }

    return result as string;
  }

  // Cargar traducciones (simulando carga de archivos JSON)
  private loadTranslations() {
    const translations = {
      en: {
        common: {
          loading: 'Loading...',
          error: 'Error',
          more: 'MORE',
          getOffer: 'Get Offer',
          getCoupon: 'Get Coupon',
          viewOffers: 'View Offers',
        },
        header: {
          welcome: 'Welcome back!',
          login: 'LOGIN',
          linkCard: 'LINK YOUR CARD',
        },
        menu: {
          title: 'Explore Instant Coupons',
        },
        brand: {
          title: 'Featured Instant Coupons',
          sortBy: 'Sort By',
          nameAZ: 'Name A-Z',
          nameZA: 'Name Z-A',
          descriptionAZ: 'Description A-Z',
          descriptionZA: 'Description Z-A',
          moreInstantCoupons: 'MORE INSTANT COUPONS',
          loadingBrands: 'Loading brands...',
          errorLoadingBrands: 'Error loading brands',
          noBrandsAvailable: 'No brands available for this category',
        },
        listBrands: {
          title: 'Unlock the full power of',
          linkCard: 'Link your card',
          selectCategory: 'Select a category to see exclusive offers',
        },
        table: {
          title: 'Link your bussiness card',
          subtitle: 'to unlock cashback offers',
          noCardRequired: 'No card linking required',
          linkCardToGet: 'Link your card to get',
          linkCard: 'Link your card',
          features: {
            instantCoupons: 'Instant Coupons',
            visaBenefits: 'Full access to Visa Savings Edge benefits',
            cashbackTracking: 'Cashback tracking',
            merchantLocation: 'Merchant location search',
            cashbackOffers: 'Cashback offers',
          },
        },
        footer: {
          contactSupport: 'Contact Support',
          termsConditions: 'Terms and Conditions',
          privacyPolicy: 'Privacy Policy',
          cookiePolicy: 'Cookie Policy',
        },
        login: {
          email: 'Email',
          password: 'Password',
          login: 'Login',
          cancel: 'Cancel',
        },
      },
      es: {
        common: {
          loading: 'Cargando...',
          error: 'Error',
          more: 'MÁS',
          getOffer: 'Ver Oferta',
          getCoupon: 'Obtener Cupón',
          viewOffers: 'Ver Ofertas',
        },
        header: {
          welcome: '¡Bienvenido de nuevo!',
          login: 'INICIAR SESIÓN',
          linkCard: 'VINCULAR TARJETA',
        },
        menu: {
          title: 'Explora Cupones Instantáneos',
        },
        brand: {
          title: 'Cupones Instantáneos Destacados',
          sortBy: 'Ordenar Por',
          nameAZ: 'Nombre A-Z',
          nameZA: 'Nombre Z-A',
          descriptionAZ: 'Descripción A-Z',
          descriptionZA: 'Descripción Z-A',
          moreInstantCoupons: 'MÁS CUPONES INSTANTÁNEOS',
          loadingBrands: 'Cargando marcas...',
          errorLoadingBrands: 'Error al cargar marcas',
          noBrandsAvailable: 'No hay marcas disponibles para esta categoría',
        },
        listBrands: {
          title: 'Desbloquea todo el poder de',
          linkCard: 'Vincula tu tarjeta',
          selectCategory:
            'Selecciona una categoría para ver ofertas exclusivas',
        },
        table: {
          title: 'Vincula tu tarjeta comercial',
          subtitle: 'para desbloquear ofertas de cashback',
          noCardRequired: 'No requiere vincular tarjeta',
          linkCardToGet: 'Vincula tu tarjeta para obtener',
          linkCard: 'Vincula tu tarjeta',
          features: {
            instantCoupons: 'Cupones Instantáneos',
            visaBenefits: 'Acceso completo a beneficios de Visa Savings Edge',
            cashbackTracking: 'Seguimiento de cashback',
            merchantLocation: 'Búsqueda de ubicación de comerciantes',
            cashbackOffers: 'Ofertas de cashback',
          },
        },
        footer: {
          contactSupport: 'Contactar Soporte',
          termsConditions: 'Términos y Condiciones',
          privacyPolicy: 'Política de Privacidad',
          cookiePolicy: 'Política de Cookies',
        },
        login: {
          email: 'Correo Electrónico',
          password: 'Contraseña',
          login: 'Iniciar Sesión',
          cancel: 'Cancelar',
        },
      },
    };

    this.translations.set(translations);
  }
}
