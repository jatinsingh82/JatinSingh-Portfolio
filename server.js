import express from 'express';
import { join } from 'path';

const app = express();

const ROOT = process.cwd();

// Serve all static files from project root
app.use(express.static(ROOT));

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

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});