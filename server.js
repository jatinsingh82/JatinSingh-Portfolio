import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Serve static files
app.use(express.static(__dirname));

// Only send index.html for page routes
app.get('*', (req, res) => {
  const requestedPath = join(__dirname, req.path);

  if (req.path.includes('.')) {
    return res.status(404).send('File not found');
  }

  res.sendFile(join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});