#!/usr/bin/env node

/**
 * Script para verificar que la configuración de GitHub Pages está correcta
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de GitHub Pages...\n');

// Verificar archivos necesarios
const requiredFiles = [
  { path: '.github/workflows/deploy.yml', name: 'GitHub Actions workflow' },
  { path: 'www/.nojekyll', name: 'Archivo .nojekyll' },
  { path: 'scripts/post-build.js', name: 'Script de post-build' },
  { path: 'README.md', name: 'README con instrucciones' }
];

let allOk = true;

requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, '..', file.path);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${file.name}`);
  } else {
    console.log(`❌ ${file.name} - FALTA`);
    allOk = false;
  }
});

// Verificar package.json scripts
console.log('\n📦 Verificando scripts en package.json...');
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

const requiredScripts = [
  { name: 'build:gh-pages', description: 'Build para GitHub Pages' },
  { name: 'deploy:gh-pages', description: 'Deploy manual' }
];

requiredScripts.forEach(script => {
  if (packageJson.scripts[script.name]) {
    console.log(`✅ ${script.description}`);
  } else {
    console.log(`❌ ${script.description} - FALTA`);
    allOk = false;
  }
});

// Verificar dependencias
console.log('\n📚 Verificando dependencias...');
if (packageJson.devDependencies['angular-cli-ghpages']) {
  console.log('✅ angular-cli-ghpages instalado');
} else {
  console.log('❌ angular-cli-ghpages - FALTA');
  allOk = false;
}

console.log('\n' + '='.repeat(50));

if (allOk) {
  console.log('🎉 ¡Configuración completa! El proyecto está listo para GitHub Pages');
  console.log('\n📋 Próximos pasos:');
  console.log('1. Push al repositorio de GitHub');
  console.log('2. Ir a Settings → Pages en GitHub');
  console.log('3. Seleccionar "GitHub Actions" como fuente');
  console.log('4. ¡El deployment será automático!');
} else {
  console.log('⚠️  Hay problemas en la configuración que deben resolverse');
  process.exit(1);
}

console.log('\n🚀 URL esperada: https://[tu-usuario].github.io/ventures-app/');
