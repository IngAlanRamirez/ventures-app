# Ventures App 🚀

Aplicación Ionic/Angular con fondo animado de esferas azules y funcionalidades avanzadas.

## 🌟 Características

- **Fondo animado**: Esferas azules con efecto blur y animaciones CSS
- **Arquitectura moderna**: Angular 20 + Ionic 8
- **Estado reactivo**: NgRx para manejo de estado global
- **Responsive design**: Adaptable a todos los dispositivos
- **UI/UX avanzada**: Material Design + Ionic Components
- **CORS Resiliente**: Fallback automático con datos mock
- **Debugging Avanzado**: Logging detallado para troubleshooting
- **Sin Dependencias Externas**: Funciona independientemente de APIs

## 🛠️ Tecnologías

- **Framework**: Ionic 8 + Angular 20
- **Estado**: NgRx (Store, Effects, Signals)
- **Estilos**: SCSS + CSS Animations  
- **Build**: Angular CLI
- **Testing**: Jasmine + Karma
- **Deployment**: GitHub Pages + GitHub Actions

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/[tu-usuario]/ventures-app.git
cd ventures-app

# Instalar dependencias
npm install --legacy-peer-deps

# Ejecutar en desarrollo
npm start
```

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm start                 # Servidor de desarrollo
npm run build            # Build básico
npm run build:prod       # Build de producción

# GitHub Pages
npm run build:gh-pages   # Build para GitHub Pages
npm run deploy:gh-pages  # Deploy manual a GitHub Pages

# Testing y Calidad
npm test                 # Ejecutar tests
npm run lint            # Verificar código
```

## 🌐 Deployment a GitHub Pages

### Automático (Recomendado)
El proyecto está configurado con GitHub Actions para deployment automático:

1. **Push a main/master** → Build y deploy automático
2. **Pull Request** → Build de verificación

### Manual
Para deployment manual:

```bash
npm run deploy:gh-pages
```

### Configuración del Repositorio

1. Ve a **Settings** → **Pages** en tu repositorio
2. Selecciona **GitHub Actions** como fuente
3. El workflow se ejecutará automáticamente en cada push

## 🛡️ Manejo de CORS y APIs Externas

### 🔧 Características Implementadas:

- **Interceptor CORS**: Detecta y reporta errores de CORS automáticamente
- **Mock Data Service**: Datos de prueba como fallback cuando la API falla
- **Logging Detallado**: Información de debugging en consola del navegador
- **Fallback Automático**: La app funciona aunque la API externa no esté disponible

### 🚨 Troubleshooting de APIs:

**Problema**: "La app no muestra datos en GitHub Pages"

**Causa**: Errores de CORS al acceder a APIs externas desde GitHub Pages

**Solución Implementada**:
1. La app detecta automáticamente errores de API
2. Activa datos mock como fallback
3. Muestra información de debugging en consola
4. La aplicación funciona completamente con datos de prueba

**Para ver el debugging**:
1. Abre la app en: https://IngAlanRamirez.github.io/ventures-app/
2. Abre Developer Tools (F12)
3. Ve a la pestaña Console
4. Observa los logs de APIs y fallbacks

### 📊 Datos Mock Incluidos:

- **Categorías**: 6 categorías (Smartphones, Laptops, Tablets, etc.)
- **Marcas**: 8 marcas distribuidas por categorías
- **Imágenes**: Placeholders generados automáticamente
- **Estructura**: Compatible con la API original

## 📁 Estructura del Proyecto

```
ventures-app/
├── src/
│   ├── app/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── models/         # Interfaces y tipos
│   │   ├── services/       # Servicios HTTP
│   │   ├── store/          # NgRx store
│   │   └── home/           # Página principal
│   ├── assets/             # Recursos estáticos
│   └── theme/              # Variables de tema
├── .github/workflows/      # GitHub Actions
└── scripts/                # Scripts de build
```

## 🎨 Características del Fondo Animado

- **4 esferas azules** con diferentes tamaños y colores
- **Animaciones asincrónicas** para movimiento natural
- **Efecto blur** sutil para profundidad
- **Posicionamiento responsivo** sin scroll adicional
- **Z-index optimizado** para interacción normal

## 🔧 Configuración de Desarrollo

### Variables de Entorno
Crea archivos de environment según sea necesario:
- `src/environments/environment.ts` (desarrollo)
- `src/environments/environment.prod.ts` (producción)

### Proxy para APIs
El archivo `proxy.config.js` está configurado para desarrollo.

## 📱 Compatibilidad

- **Web**: Todos los navegadores modernos
- **Mobile**: iOS y Android (via Capacitor)
- **PWA**: Progressive Web App ready

## 🤝 Contribución

1. Fork del proyecto
2. Crear branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🚀 Deploy URL

Una vez configurado GitHub Pages, la aplicación estará disponible en:
`https://[tu-usuario].github.io/ventures-app/`

---

**Desarrollado con ❤️ usando Ionic + Angular**
