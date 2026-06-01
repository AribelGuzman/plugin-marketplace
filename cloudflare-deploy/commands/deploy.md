Despliega el proyecto actual en Cloudflare Workers usando Wrangler.

## Qué debes hacer

1. Verifica que existe `wrangler.toml` o `wrangler.json` en el directorio raíz. Si no existe, detente y dile al usuario que primero ejecute `/cloudflare-deploy:setup`

2. Comprueba que el usuario tiene sesión activa ejecutando:
   ```bash
   wrangler whoami
   ```
   Si falla, indícale que ejecute `wrangler login` primero.

3. Ejecuta el despliegue:
   ```bash
   wrangler deploy
   ```

4. Si el argumento `$ARGUMENTS` contiene `--env <nombre>`, despliega en ese entorno:
   ```bash
   wrangler deploy --env <nombre>
   ```

5. Tras el despliegue exitoso, muestra:
   - La URL del Worker desplegado
   - El comando para ver los logs en tiempo real: `wrangler tail`

## Errores comunes

| Error | Solución |
|-------|----------|
| `Missing entry-point` | El campo `main` en `wrangler.toml` no apunta a un archivo existente |
| `Authentication error` | Ejecutar `wrangler login` |
| `Script too large` | Revisar que no se estén empaquetando `node_modules` innecesarios |
| `compatibility_date` inválida | Usar una fecha en formato `YYYY-MM-DD` no futura |
