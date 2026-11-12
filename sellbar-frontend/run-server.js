const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const port = process.env.PORT || 3000;
process.env.PORT = String(port);
process.env.HOSTNAME = '0.0.0.0';

const standaloneSub = path.join(__dirname, '.next', 'standalone', 'sellbar-frontend', 'server.js');
const standaloneRoot = path.join(__dirname, '.next', 'standalone', 'server.js');

if (fs.existsSync(standaloneSub)) {
  console.log(`[Sellbar] Starting standalone server from ${standaloneSub} on port ${port}...`);
  require(standaloneSub);
} else if (fs.existsSync(standaloneRoot)) {
  console.log(`[Sellbar] Starting standalone server from ${standaloneRoot} on port ${port}...`);
  require(standaloneRoot);
} else {
  console.log(`[Sellbar] Standalone not found, falling back to next start on port ${port}...`);
  const nextBin = path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next');
  const child = spawn(process.execPath, [nextBin, 'start', '-H', '0.0.0.0', '-p', String(port)], {
    stdio: 'inherit',
    env: process.env,
  });
  child.on('exit', (code) => process.exit(code || 0));
}
