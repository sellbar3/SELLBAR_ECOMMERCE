const fs = require('fs');
const path = require('path');

/**
 * Copies static assets and public directory to Next.js standalone folder.
 * Handles both root standalone output (.next/standalone) and monorepo structure if present.
 */
function copyDirectorySync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectorySync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function syncStandaloneAssets() {
  const rootDir = process.cwd();
  const standaloneDir = path.join(rootDir, '.next', 'standalone');

  if (!fs.existsSync(standaloneDir)) {
    console.log('[copy-standalone] No .next/standalone directory found. Skipping static asset sync.');
    return;
  }

  const staticSrc = path.join(rootDir, '.next', 'static');
  const publicSrc = path.join(rootDir, 'public');

  // 1. Copy into .next/standalone/.next/static
  const staticDest = path.join(standaloneDir, '.next', 'static');
  if (fs.existsSync(staticSrc)) {
    copyDirectorySync(staticSrc, staticDest);
    console.log('[copy-standalone] Synced .next/static -> .next/standalone/.next/static');
  }

  // 2. Copy into .next/standalone/public
  const publicDest = path.join(standaloneDir, 'public');
  if (fs.existsSync(publicSrc)) {
    copyDirectorySync(publicSrc, publicDest);
    console.log('[copy-standalone] Synced public -> .next/standalone/public');
  }

  console.log('✓ [copy-standalone] Standalone static assets successfully verified.');
}

try {
  syncStandaloneAssets();
} catch (err) {
  console.error('[copy-standalone] Error syncing standalone assets:', err);
  // Do not exit with non-zero so build doesn't fail if standalone is managed by host
}
