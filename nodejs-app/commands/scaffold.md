Crea una nueva aplicación Node.js lista para producción en el directorio actual.

## Qué debes hacer

1. Lee el argumento `$ARGUMENTS` para obtener el nombre del proyecto. Si no se proporciona, usa el nombre del directorio actual.
2. Crea la siguiente estructura de archivos:

```
<nombre>/
├── src/
│   └── index.js
├── .gitignore
├── .env.example
├── package.json
└── README.md
```

3. `package.json` debe incluir:
   - `"type": "module"` para usar ESM
   - Script `"dev": "node --watch src/index.js"`
   - Script `"start": "node src/index.js"`
   - Script `"test": "node --test"`
   - Dependencia `express` en la versión más reciente estable

4. `src/index.js` debe ser un servidor Express mínimo y funcional:
   - Puerto configurable por variable de entorno `PORT` (default 3000)
   - Ruta `GET /health` que devuelve `{ status: "ok" }`
   - Middleware `express.json()`

5. `.gitignore` debe incluir `node_modules/`, `.env`, `dist/`

6. `.env.example` debe incluir `PORT=3000`

7. Tras crear los archivos ejecuta `npm install` dentro del directorio del proyecto.

8. Informa al usuario con la estructura creada y cómo arrancar: `npm run dev`

## Convenciones

- Sin comentarios en el código a menos que la lógica sea no obvia
- Nombres de variables autoexplicativos
- No añadas dependencias que no se pidan explícitamente
