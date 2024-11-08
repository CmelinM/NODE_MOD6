/**
 * Caso práctico event emitter node
 * 
 * Se busca usar la interfaz por defecto de EventEmitter
 */

import { EventEmitter } from 'node:events'

const eventEmitter = new EventEmitter()

eventEmitter.on('inicio', () => {
  console.log(`Evento iniciado`)
})

setTimeout(() => {
  eventEmitter.emit('inicio')
}, 3000)
