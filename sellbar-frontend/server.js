const path = require('path');
const fs = require('fs');

const port = parseInt(process.env.PORT, 10) || 3000;
const hostname = process.env.HOSTNAME || '0.0.0.0';

process.env.PORT = String(port);
process.env.HOSTNAME = hostname;
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Standalone server paths
const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');
const standaloneSub = path.join(__dirname, '.next', 'standalone', 'sellbar-frontend', 'server.js');

if (fs.existsSync(standaloneServer) && path.resolve(standaloneServer) !== path.resolve(__filename)) {
  console.log(`[Sellbar] Launching Next.js standalone server on ${hostname}:${port}...`);
  require(standaloneServer);
} else if (fs.existsSync(standaloneSub) && path.resolve(standaloneSub) !== path.resolve(__filename)) {
  console.log(`[Sellbar] Launching Next.js standalone sub-server on ${hostname}:${port}...`);
  require(standaloneSub);
} else {
  console.log(`[Sellbar] Starting standard Next.js production server on ${hostname}:${port}...`);
  const { createServer } = require('http');
  const { parse } = require('url');
  const next = require('next');

  const app = next({ dev: false, dir: __dirname, hostname, port });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, hostname, (err) => {
      if (err) throw err;
      console.log(`> [Sellbar] Production server listening on http://${hostname}:${port}`);
    });
  }).catch((err) => {
    console.error('[Sellbar] Fatal server boot error:', err);
    process.exit(1);
  });
}
