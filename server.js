import express from 'express';
import { join } from 'path';

const app = express();

// Disable x-powered-by to prevent server finger-printing
app.disable('x-powered-by');

// Production Security Headers Middleware
app.use((req, res, next) => {
  // Transport and protocol hardening
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), vr=()');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');

  // Content Security Policy (frame-ancestors modern replacement for X-Frame-Options)
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https:",
    "connect-src 'self' https://api.github.com",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' mailto:",
    "frame-ancestors 'self' https://*.run.app https://*.google.com https://*.google.dev https://*.aistudio.google.com https://*.vercel.app"
  ];
  res.setHeader('Content-Security-Policy', cspDirectives.join('; '));

  next();
});

const ROOT = process.cwd();

// Security Guard: Block direct public access to backend code, configs, lockfiles, and scripts
app.use((req, res, next) => {
  const normalizedPath = decodeURIComponent(req.path).toLowerCase();
  const blockedPatterns = [
    /^\/server\.js$/,
    /^\/package(-lock)?\.json$/,
    /^\/bun\.lock$/,
    /^\/metadata\.json$/,
    /^\/eslint\.config\.js$/,
    /^\/vercel\.json$/,
    /^\/scripts(\/|$)/,
    /^\/\./
  ];

  if (blockedPatterns.some((pattern) => pattern.test(normalizedPath))) {
    return res.status(404).send('Not found');
  }

  next();
});

// Ensure AVIF MIME type is correctly recognized
express.static.mime.define({ 'image/avif': ['avif'] });

// Serve public static assets with dotfiles protected and optimized caching policies
app.use(
  express.static(ROOT, {
    dotfiles: 'ignore',
    setHeaders: (res, filePath) => {
      // Long-term immutable caching for images, icons, and vendor modules
      if (
        filePath.match(/\.(avif|webp|jpe?g|png|svg|ico)$/i) ||
        filePath.includes('/assets/js/vendor/')
      ) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (filePath.match(/\.(css|js)$/i)) {
        res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
      } else if (filePath.match(/\.(html)$/i)) {
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      }
    }
  })
);

// Explicit resume routes
app.get(['/resume', '/resume/', '/resume.html', '/download-resume'], (req, res) => {
  res.sendFile(join(ROOT, 'resume.html'));
});

// SPA fallback only for actual page routes
app.get('*', (req, res) => {
  if (req.path.includes('.')) {
    return res.status(404).send('File not found');
  }

  res.sendFile(join(ROOT, 'index.html'));
});

const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});