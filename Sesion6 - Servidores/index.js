/**
 * 
 * Especificaciones aplicación echo
 * 
 * https://www.rfc-editor.org/rfc/rfc862
 */

import * as net from 'node:net'

// Argumentos desde la línea de comandos
const port = process.argv[2] || 7 // Puerto según especificación

let server = net.createServer(socket => {
  /**
   * Cuando llega data, la devuelve
   */
  socket.on('data', data => {
    socket.write(data)
  })

  socket.on('error', () => {
    socket.destroy()
    console.log(`Conexión cerrada`)
  })
})

server.listen(port)
