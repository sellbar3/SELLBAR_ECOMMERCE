const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const frontendDir = path.join(rootDir, 'sellbar-frontend');

console.log('[copy-build] Preparing build artifacts for hosting deployment...');

// 1. Copy .next directory to root .next so host output directory detects it
const srcNext = path.join(frontendDir, '.next');
const destNext = path.join(rootDir, '.next');

if (fs.existsSync(srcNext)) {
  console.log(`[copy-build] Copying ${srcNext} -> ${destNext}...`);
  if (fs.existsSync(destNext)) {
    fs.rmSync(destNext, { recursive: true, force: true });
  }
  fs.cpSync(srcNext, destNext, { recursive: true });
  console.log('[copy-build] Successfully copied .next to root!');
} else {
  console.warn('[copy-build] Warning: sellbar-frontend/.next not found!');
}

// 2. Copy public directory to root public
const srcPublic = path.join(frontendDir, 'public');
const destPublic = path.join(rootDir, 'public');

if (fs.existsSync(srcPublic)) {
  console.log(`[copy-build] Copying ${srcPublic} -> ${destPublic}...`);
  if (fs.existsSync(destPublic)) {
    fs.rmSync(destPublic, { recursive: true, force: true });
  }
  fs.cpSync(srcPublic, destPublic, { recursive: true });
  console.log('[copy-build] Successfully copied public to root!');
}

// 3. Copy next.config.mjs to root if present
const srcConfig = path.join(frontendDir, 'next.config.mjs');
const destConfig = path.join(rootDir, 'next.config.mjs');
if (fs.existsSync(srcConfig)) {
  fs.copyFileSync(srcConfig, destConfig);
  console.log('[copy-build] Successfully copied next.config.mjs to root!');
}

console.log('[copy-build] Build preparation finished successfully.');
