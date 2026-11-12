const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const hostname = process.env.HOSTNAME || '0.0.0.0';

process.env.PORT = String(port);
process.env.HOSTNAME = hostname;
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

console.log(`[Sellbar] Starting standard Next.js production server on ${hostname}:${port}...`);
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
