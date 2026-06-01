# Ikerlan Plugin Marketplace para Claude Code

Marketplace de plugins para Claude Code con comandos para construir apps Node.js y desplegar en Cloudflare Workers.

## Instalación

```
/plugin marketplace add ./ruta/a/plugin-marketplace
```

Luego en Claude Code:
1. Escribe `/plugins`
2. Navega a **marketplaces**
3. Selecciona **ikerlan-plugins**
4. Instala el plugin que necesites

---

## Plugins disponibles

### `nodejs-app`

Scaffolding y utilidades para construir aplicaciones Node.js.

| Comando | Descripción |
|---|---|
| `/nodejs-app:scaffold [nombre]` | Crea una app Node.js + Express lista para producción |
| `/nodejs-app:add-route <MÉTODO> <ruta>` | Añade una ruta Express al proyecto actual |
| `/nodejs-app:add-test <archivo>` | Genera tests con `node:test` para un archivo |

---

### `cloudflare-deploy`

Despliegue y configuración de Cloudflare Workers desde Claude Code.

| Comando | Descripción |
|---|---|
| `/cloudflare-deploy:setup [nombre]` | Configura `wrangler.toml` en el proyecto actual |
| `/cloudflare-deploy:deploy [--env nombre]` | Despliega el Worker en Cloudflare |
| `/cloudflare-deploy:add-binding <tipo> <NOMBRE>` | Añade un binding KV / D1 / R2 / AI |

---

## Estructura

```
plugin-marketplace/
├── .claude-plugin/
│   └── marketplace.json          ← registro del marketplace
├── nodejs-app/
│   ├── .claude-plugin/
│   │   └── plugin.json
│   ├── commands/
│   │   ├── scaffold.md
│   │   ├── add-route.md
│   │   └── add-test.md
│   └── scripts/
│       └── scaffold.sh
└── cloudflare-deploy/
    ├── .claude-plugin/
    │   └── plugin.json
    ├── commands/
    │   ├── deploy.md
    │   ├── setup.md
    │   └── add-binding.md
    ├── hooks/
    │   └── hooks.json
    └── scripts/
        └── deploy.sh
```

## Añadir un plugin nuevo

1. Crea un directorio: `mkdir -p mi-plugin/{.claude-plugin,commands,scripts}`
2. Añade los metadatos en `mi-plugin/.claude-plugin/plugin.json`
3. Crea los comandos como archivos `.md` en `mi-plugin/commands/`
4. Registra el plugin en `.claude-plugin/marketplace.json`
