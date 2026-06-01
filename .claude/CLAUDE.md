# Plugin Marketplace — guía para Claude Code

## Skills disponibles

- **`skills/nodejs-app.md`** — cómo crear plugins y rutas nuevas en Node.js
- **`skills/cloudflare-deploy.md`** — cómo desplegar y configurar el Worker en Cloudflare

Para activar una skill en tu sesión de Claude Code, di:
> "usa la skill nodejs-app para crear el plugin X"

## Estructura del proyecto

```
plugin-marketplace/
├── src/
│   ├── index.js          ← servidor Express (desarrollo local)
│   ├── worker.js         ← entry point para Cloudflare Workers
│   ├── registry.js       ← carga y busca plugins del disco
│   ├── routes/           ← rutas Express
│   └── middleware/       ← errorHandler
├── plugins/              ← un directorio por plugin
│   └── hello-world/
│       ├── plugin.json   ← metadatos
│       └── index.js      ← lógica
├── skills/               ← guías para Claude Code
├── wrangler.toml         ← configuración de Cloudflare Workers
└── package.json
```

## Convenciones

- CommonJS (`require`) en Express. ESM (`export default`) solo en `worker.js`.
- Tests: `node:test` nativo, sin frameworks externos.
- Secrets locales en `.dev.vars` (no commitear).
- Sin comentarios redundantes en el código.
