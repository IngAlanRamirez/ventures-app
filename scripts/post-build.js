#!/usr/bin/env node

/**
 * Script de post-build para GitHub Pages
 * Crea el archivo .nojekyll necesario para el deployment
 */

const fs = require('fs');
const path = require('path');

// Directorio de salida del build
const outputDir = path.join(__dirname, '..', 'www');
const nojekyllPath = path.join(outputDir, '.nojekyll');

// Crear archivo .nojekyll si no existe
if (!fs.existsSync(nojekyllPath)) {
  fs.writeFileSync(nojekyllPath, '');
  console.log('✅ Archivo .nojekyll creado para GitHub Pages');
} else {
  console.log('ℹ️  El archivo .nojekyll ya existe');
}

console.log('🚀 Post-build para GitHub Pages completado');
