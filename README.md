# Ventures App 🚀

Aplicación Ionic/Angular con fondo animado de esferas azules y funcionalidades avanzadas.

## 🌟 Características

- **Fondo animado**: Esferas azules con efecto blur y animaciones CSS
- **Arquitectura moderna**: Angular 20 + Ionic 8
- **Estado reactivo**: NgRx para manejo de estado global
- **Responsive design**: Adaptable a todos los dispositivos
- **UI/UX avanzada**: Material Design + Ionic Components

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
