# Skill: Construir aplicaciones Node.js

Úsame cuando necesites crear o ampliar una aplicación Node.js en este marketplace.

## Cuándo usar esta skill

- Crear un nuevo plugin para el marketplace
- Agregar rutas o endpoints a la API
- Integrar una base de datos (SQLite, PostgreSQL, MongoDB)
- Añadir autenticación JWT o API keys
- Escribir tests con `node:test`

---

## Estructura de un plugin

Cada plugin vive en `plugins/<nombre>/` y debe tener:

```
plugins/<nombre>/
├── plugin.json   ← metadatos obligatorios
└── index.js      ← lógica del plugin (exporta funciones)
```

### plugin.json (campos obligatorios)

```json
{
  "name": "mi-plugin",
  "version": "1.0.0",
  "description": "Descripción corta del plugin",
  "author": "Tu nombre",
  "license": "MIT",
  "tags": ["etiqueta1", "etiqueta2"]
}
```

### index.js (patrón recomendado)

```js
function execute(input) {
  // lógica del plugin
  return { result: input };
}

module.exports = { execute };
```

---

## Agregar una ruta a la API

Edita `src/routes/plugins.js` o crea un archivo nuevo en `src/routes/`.
Registra el router en `src/index.js`:

```js
const miRouter = require('./routes/mi-ruta');
app.use('/api/mi-ruta', miRouter);
```

---

## Convenciones de código

- Node.js >= 18, CommonJS (`require`/`module.exports`) para la app Express.  
  ESM (`export default`) **solo** en `src/worker.js` (Cloudflare Workers).
- Sin comentarios redundantes; nombres de variables autoexplicativos.
- Validación de entrada solo en los límites del sistema (body HTTP, argumentos CLI).
- No uses `try/catch` genérico; deja que el middleware `errorHandler` capture errores no manejados.

---

## Comandos útiles

```bash
npm install              # instalar dependencias
npm run dev              # servidor con hot-reload (node --watch)
npm start                # producción local
npm test                 # correr tests
```

---

## Ejemplo completo: nuevo plugin "timestamp"

**plugins/timestamp/plugin.json**
```json
{
  "name": "timestamp",
  "version": "1.0.0",
  "description": "Devuelve el timestamp actual en distintos formatos",
  "author": "Ikerlan",
  "tags": ["fecha", "tiempo", "utilidad"]
}
```

**plugins/timestamp/index.js**
```js
function now(format = 'iso') {
  const date = new Date();
  if (format === 'unix') return { timestamp: Math.floor(date / 1000) };
  return { timestamp: date.toISOString() };
}

module.exports = { now };
```

Después de crear los archivos, el plugin aparece automáticamente en `GET /api/plugins`.
