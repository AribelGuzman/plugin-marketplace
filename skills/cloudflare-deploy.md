# Skill: Desplegar en Cloudflare Workers

Úsame cuando necesites desplegar este marketplace (o un Worker nuevo) en Cloudflare.

## Cuándo usar esta skill

- Primer despliegue del marketplace en Cloudflare Workers
- Actualizar el Worker tras cambios en `src/worker.js`
- Configurar variables de entorno en producción
- Añadir bindings (KV, D1, R2, AI)
- Configurar un dominio personalizado

---

## Prerrequisitos

```bash
npm install -g wrangler      # instalar CLI de Cloudflare
wrangler login               # autenticarse (abre navegador)
wrangler whoami              # verificar cuenta activa
```

---

## Despliegue básico

```bash
# desde la raíz del proyecto
wrangler deploy
```

Esto publica `src/worker.js` y devuelve una URL `*.workers.dev`.

---

## Configuración en wrangler.toml

```toml
name = "plugin-marketplace"
main = "src/worker.js"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

[vars]
NODE_ENV = "production"
```

| Campo                  | Descripción                                              |
|------------------------|----------------------------------------------------------|
| `name`                 | Nombre del Worker (aparece en la URL `*.workers.dev`)    |
| `main`                 | Entry point ESM del Worker                               |
| `compatibility_date`   | Fecha de comportamiento de la plataforma (no cambiar)    |
| `nodejs_compat`        | Activa APIs de Node.js (Buffer, process, crypto, etc.)  |

---

## Variables de entorno

### En desarrollo

Crea `.dev.vars` (ignorado por git):

```
API_SECRET=mi-secreto-local
```

### En producción

```bash
wrangler secret put API_SECRET
# te pedirá el valor por stdin
```

Listar secrets activos:
```bash
wrangler secret list
```

---

## Añadir bindings de almacenamiento

### KV (caché / sesiones)

```toml
[[kv_namespaces]]
binding = "CACHE"
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

```bash
wrangler kv namespace create CACHE
```

### D1 (base de datos SQLite serverless)

```toml
[[d1_databases]]
binding = "DB"
database_name = "marketplace-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

```bash
wrangler d1 create marketplace-db
wrangler d1 execute marketplace-db --file=schema.sql
```

### R2 (almacenamiento de objetos)

```toml
[[r2_buckets]]
binding = "ASSETS"
bucket_name = "marketplace-assets"
```

```bash
wrangler r2 bucket create marketplace-assets
```

---

## Entornos (staging / producción)

```toml
[env.staging]
name = "plugin-marketplace-staging"
vars = { NODE_ENV = "staging" }

[env.production]
name = "plugin-marketplace"
vars = { NODE_ENV = "production" }
```

```bash
wrangler deploy --env staging     # despliega en staging
wrangler deploy --env production  # despliega en producción
```

---

## Dominio personalizado

```bash
wrangler deploy --route "marketplace.tudominio.com/*"
```

O en `wrangler.toml`:

```toml
routes = [
  { pattern = "marketplace.tudominio.com/*", zone_name = "tudominio.com" }
]
```

---

## Depuración en producción

```bash
wrangler tail                    # logs en tiempo real
wrangler tail --format=pretty    # logs formateados
```

---

## Flujo completo de despliegue

```bash
# 1. Verificar que el Worker funciona localmente
wrangler dev

# 2. Ejecutar tests
npm test

# 3. Desplegar
wrangler deploy

# 4. Verificar despliegue
curl https://plugin-marketplace.<tu-subdominio>.workers.dev/health
```

---

## Diferencias clave Worker vs Express

| Express (local)           | Cloudflare Worker                     |
|---------------------------|---------------------------------------|
| `require()` / CJS         | `import` / ESM                        |
| `process.env.VAR`         | `env.VAR` (parámetro del fetch)       |
| `fs.readFileSync()`       | No disponible — usar KV o D1          |
| `app.listen(port)`        | `export default { fetch(req, env) }`  |
| Middleware Express        | Lógica manual en `fetch()`            |

El archivo `src/worker.js` ya adapta la API del marketplace a este modelo.
