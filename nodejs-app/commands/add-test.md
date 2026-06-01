Genera tests para un archivo o función específica usando el módulo nativo `node:test`.

## Qué debes hacer

El argumento `$ARGUMENTS` es la ruta al archivo que se quiere testear.  
Ejemplo: `src/routes/users.js`

1. Lee el archivo indicado y entiende qué exporta
2. Crea el archivo de test en la misma ubicación con sufijo `.test.js`  
   Ejemplo: `src/routes/users.test.js`
3. Escribe tests que cubran:
   - El camino feliz (happy path) de cada función/ruta
   - Al menos un caso de error o entrada inválida

## Formato del archivo de test

```js
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('<nombre del módulo>', () => {
  it('<descripción del caso>', () => {
    // arrange
    // act
    // assert
    assert.equal(actual, expected);
  });
});
```

## Reglas

- Usa solo `node:test` y `node:assert` — sin Jest, Vitest ni ningún framework externo
- No mockees módulos que puedas instanciar directamente
- Un `describe` por función o endpoint testeado
- Tras crear el archivo, ejecuta `node --test <archivo>` y muestra el resultado
