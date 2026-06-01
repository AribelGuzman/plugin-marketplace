Añade un binding de Cloudflare (KV, D1, R2, AI) al Worker del proyecto actual.

## Qué debes hacer

El argumento `$ARGUMENTS` especifica el tipo y nombre del binding.  
Formato: `<tipo> <NOMBRE_BINDING>`  
Ejemplos: `kv CACHE`, `d1 DB`, `r2 ASSETS`, `ai AI`

1. Lee el `wrangler.toml` actual
2. Añade la sección correspondiente según el tipo:

### KV Namespace
```toml
[[kv_namespaces]]
binding = "CACHE"
id = ""  # rellenar tras ejecutar: wrangler kv namespace create CACHE
```
Comando de creación: `wrangler kv namespace create <NOMBRE_BINDING>`

### D1 Database (SQLite serverless)
```toml
[[d1_databases]]
binding = "DB"
database_name = "<nombre-bd>"
database_id = ""  # rellenar tras ejecutar el comando de creación
```
Comando de creación: `wrangler d1 create <nombre-bd>`

### R2 Bucket
```toml
[[r2_buckets]]
binding = "ASSETS"
bucket_name = "<nombre-bucket>"
```
Comando de creación: `wrangler r2 bucket create <nombre-bucket>`

### Workers AI
```toml
[ai]
binding = "AI"
```
No requiere creación previa — disponible directamente.

3. Actualiza el `wrangler.toml` con la sección correcta
4. Muestra al usuario el comando de creación a ejecutar (si aplica) y cómo acceder al binding en el código del Worker:

```js
// KV
const value = await env.CACHE.get('clave');

// D1
const result = await env.DB.prepare('SELECT * FROM tabla').all();

// R2
const object = await env.ASSETS.get('archivo.pdf');

// AI
const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', { prompt });
```
