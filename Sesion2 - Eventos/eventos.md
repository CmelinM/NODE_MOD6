# Event emitter

JavaScript en el navegador acepta interacciones con el usuario mediados por los eventos: clicks, teclado, movimientos sobre un div, etc.

Del lado del backend Node ofrece una solución similar usando el módulo de eventos.

Se puede inicializar de la siguiente forma:

```javascript
import EventEmitter from 'node:events'

const eventEmitter = new EventEmitter()
```

Algunos métodos expuestos por la clase son: 

- `emit` que sirve para emitir un evento
- `on` usado para agregar un callback que se ejecute cada vez que ocurra un evento

Ejemplo simple: 

```javascript
eventEmitter.on('inicio', () => {
  console.log('Evento inicio gatillado')
})
```

Ahora para gatillar el evento usamos `emit`

```javascript
eventEmitter.emit('inicio')
```

Lo que gatillará el callback (console.log)

## Argumentos en los eventos.

Se puede agregar argumentos al emisor de eventos, esto debe ser definido en el callback que se ejecutará en el evento registrado

```javascript
eventEmitter.on('inicio', number => {
  console.log(`Inicio el evento con numero: ${number}`)
})
```

Ahora, para llamarlo, se pasa después del identificador del evento, separado por coma el argumento

```javascript
eventEmitter.emit('inicio', 45);
```

> [!NOTE]
> De la misma forma puedes extender a múltiples argumentos: 
>
>   ```javascript
>     eventEmitter.on('inicio', (inicio, fin) => {
>       console.log(`Evento inicia en ${inicio} hasta ${fin}`)
>     })
>
>     eventEmitter.emit('inicio', 1, 100)
>   ```

