Configura un proyecto existente para desplegarlo en Cloudflare Workers.

## Qué debes hacer

El argumento `$ARGUMENTS` puede contener el nombre del Worker. Si no se proporciona, usa el nombre del directorio actual.

1. Lee el `package.json` del proyecto para entender la estructura (entry point, scripts, dependencias)

2. Determina el entry point del Worker:
   - Si existe `src/worker.js` o `src/worker.ts`, úsalo
   - Si existe `src/index.js` exportando con `export default { fetch }`, úsalo
   - Si ninguno existe, crea `src/worker.js` con un fetch handler mínimo:

   ```js
   export default {
     async fetch(request, env) {
       return new Response('Hello from Cloudflare Workers!', {
         headers: { 'Content-Type': 'text/plain' },
       });
     },
   };
   ```

3. Crea `wrangler.toml` con esta configuración base:

   ```toml
   name = "<nombre-del-worker>"
   main = "<entry-point>"
   compatibility_date = "2024-09-23"
   compatibility_flags = ["nodejs_compat"]

   [vars]
   NODE_ENV = "production"
   ```

4. Añade el script `"deploy": "wrangler deploy"` al `package.json`

5. Añade `.wrangler/` y `.dev.vars` al `.gitignore` si existe

6. Indica al usuario los siguientes pasos:
   - `wrangler login` si no tiene sesión
   - `wrangler dev` para probar localmente
   - `/cloudflare-deploy:deploy` para desplegar

## Notas sobre compatibilidad

- `nodejs_compat` activa APIs de Node.js (Buffer, crypto, process, stream)
- El entry point DEBE usar ESM (`export default`) — no `module.exports`
- `process.env` no existe; usar el parámetro `env` del fetch handler
- `fs`, `path` con acceso al sistema de archivos no están disponibles en Workers
