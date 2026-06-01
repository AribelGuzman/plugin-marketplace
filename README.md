# Plugin Marketplace

Marketplace de plugins construido con **Node.js + Express** y desplegable en **Cloudflare Workers**.

## Inicio rápido

```bash
git clone https://github.com/AribelGuzman/plugin-marketplace
cd plugin-marketplace
npm install
npm run dev
```

API disponible en `http://localhost:3000`.

## Endpoints

| Método | Ruta                          | Descripción                         |
|--------|-------------------------------|-------------------------------------|
| GET    | `/`                           | Información de la API               |
| GET    | `/health`                     | Estado del servidor                 |
| GET    | `/api/plugins`                | Listar todos los plugins            |
| GET    | `/api/plugins?q=<búsqueda>`   | Buscar plugins por nombre/etiqueta  |
| GET    | `/api/plugins/:name`          | Detalles de un plugin               |
| POST   | `/api/plugins/:name/install`  | Instrucciones de instalación        |

## Crear un plugin

Crea un directorio en `plugins/<nombre>/` con dos archivos:

**`plugin.json`**
```json
{
  "name": "mi-plugin",
  "version": "1.0.0",
  "description": "Qué hace este plugin",
  "author": "Tu nombre",
  "tags": ["etiqueta"]
}
```

**`index.js`**
```js
function execute(input) {
  return { result: input };
}
module.exports = { execute };
```

El plugin aparece automáticamente en `GET /api/plugins` sin reiniciar el servidor.

## Despliegue en Cloudflare Workers

```bash
npm install -g wrangler
wrangler login
wrangler deploy
```

Consulta [`skills/cloudflare-deploy.md`](skills/cloudflare-deploy.md) para la configuración completa.

## Skills de Claude Code

Este repositorio incluye skills para que Claude Code te ayude a trabajar en el proyecto:

- [`skills/nodejs-app.md`](skills/nodejs-app.md) — crear plugins y rutas Node.js
- [`skills/cloudflare-deploy.md`](skills/cloudflare-deploy.md) — desplegar en Cloudflare Workers

## Estructura

```
plugin-marketplace/
├── src/
│   ├── index.js        ← servidor Express
│   ├── worker.js       ← Cloudflare Workers entry point
│   ├── registry.js     ← carga plugins del disco
│   ├── routes/
│   └── middleware/
├── plugins/
│   └── hello-world/    ← plugin de ejemplo
├── skills/             ← guías para Claude Code
├── wrangler.toml       ← configuración Cloudflare
└── .claude/CLAUDE.md   ← contexto para Claude Code
```

## Licencia

MIT
