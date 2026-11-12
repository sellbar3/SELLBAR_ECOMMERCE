const { createServer } = require('http');
const { parse } = require('url');
const path = require('path');
const fs = require('fs');

const port = parseInt(process.env.PORT, 10) || 3000;
const hostname = '0.0.0.0';
process.env.PORT = String(port);
process.env.HOSTNAME = hostname;

// Check if Next.js standalone server exists
const standaloneSub = path.join(__dirname, '.next', 'standalone', 'sellbar-frontend', 'server.js');
const standaloneRoot = path.join(__dirname, '.next', 'standalone', 'server.js');

if (fs.existsSync(standaloneSub)) {
  console.log(`[Sellbar] Starting standalone server from ${standaloneSub} on port ${port}...`);
  require(standaloneSub);
} else if (fs.existsSync(standaloneRoot)) {
  console.log(`[Sellbar] Starting standalone server from ${standaloneRoot} on port ${port}...`);
  require(standaloneRoot);
} else {
  console.log(`[Sellbar] Starting custom Next.js server on port ${port}...`);
  const next = require('next');
  const app = next({ dev: false, dir: __dirname });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, hostname, (err) => {
      if (err) throw err;
      console.log(`> [Sellbar] Live on http://${hostname}:${port}`);
    });
  }).catch((err) => {
    console.error('[Sellbar] Startup error:', err);
    process.exit(1);
  });
}
