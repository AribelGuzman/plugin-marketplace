#!/usr/bin/env bash
# Crea la estructura de una app Node.js mínima
set -euo pipefail

NAME="${1:-my-app}"

mkdir -p "$NAME/src"

cat > "$NAME/package.json" <<JSON
{
  "name": "$NAME",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "node --watch src/index.js",
    "test": "node --test"
  },
  "dependencies": {
    "express": "^4.19.2"
  }
}
JSON

cat > "$NAME/src/index.js" <<'JS'
import express from 'express';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
JS

echo 'node_modules/
.env
dist/' > "$NAME/.gitignore"

echo 'PORT=3000' > "$NAME/.env.example"

echo "✓ Proyecto '$NAME' creado. Ejecuta: cd $NAME && npm install && npm run dev"
