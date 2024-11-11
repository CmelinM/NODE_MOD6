# FileSystem Node.js

El módulo FileSystem de node permite que operemos sobre el sistema de archivos del sistema operativo (OS)

Está diseñado para trabajar según los estándares POSIX

> [!NOTE]
> POSIX (Interfaz de Sisteama Operativo Portatil) es un conjunto de estándares que permite la compatibilidad de sistemas operativos similares a UNIX (Mac, BSD, Linux, Minix)

Como muchas cosas en JS existe una versión basada en Callbacks y otra versión basada en promesas, nosotros usaremos el formato promesas.

Para importar el módulo se puede realizar de la siguiente forma:

```javascript
import * as fs from 'node:fs/promises'
```

Un ejemplo simple: 

```javascript
import * as fs from 'node:fs/promises';

try {
  await unlink('/tmp/hola')
  console.log('borrado exitoso de /tmp/hola')
} catch (err) {
  console.error('Ocurrió un error:', err.message)
}
```


