Añade una nueva ruta Express a la aplicación Node.js del directorio actual.

## Qué debes hacer

El argumento `$ARGUMENTS` tiene el formato: `<método> <ruta> [descripción]`  
Ejemplo: `GET /api/users Lista todos los usuarios`

1. Identifica el archivo de rutas existente o crea uno nuevo en `src/routes/<recurso>.js`
2. Crea el handler con la lógica mínima para que la ruta funcione (devuelve datos de ejemplo si no hay base de datos)
3. Registra la ruta en `src/index.js` si no está ya registrada
4. Si el proyecto usa TypeScript, añade los tipos correctos

## Formato del archivo de ruta

```js
import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ data: [] });
});

export default router;
```

## Reglas

- Una sola responsabilidad por archivo de ruta
- No uses `try/catch` genérico; deja que el error handler centralizado capture los errores
- Valida el input del usuario solo en los límites del sistema (body HTTP)
- Informa al usuario de la ruta creada y cómo probarla con `curl`
