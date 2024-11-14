/**
 * Implementación flaite de IRC
 */

import * as net from 'node:net'

const port = process.argv[2] || 9000
let clientes = [] // Los clientes conectados al chat

const server = net.createServer(socket => {
  /**
   * Listamos clientes (sockets) en nuestra clientes
   */
  clientes.push(socket)

  socket.on('error', () => {
    socket.write(`Cliente desconectado`)
    socket.destroy()
  })

  socket.on('data', msg => {
    for(let cliente of clientes) {
      // cliente.write(`Respuesta: ${msg}`)
      if(cliente != socket) {
        cliente.write(`Respuesta: ${msg}`)
      }
    }
  })
})

server.listen(port)