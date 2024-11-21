/**
 * Node Net
 * 
 * Permite comunicación de Sockets
 */

import * as net from 'node:net'

/**
 * process.argv[2] toma argumentos de la línea de comandos
 */

const host = process.argv[2] || 'localhost' // Dirección del PC Servidor
const port = process.argv[3] || 80 // Puerto de App servidora

const socket = net.createConnection({ host, port })

/**
 * Entrada de data por socket
 */
socket.on('data', data => {
  process.stdout.write(`\nRespuesta:\n ${data}`)
})

/**
 * Manejo de error
 */
socket.on('error', err => {
  console.log(`No hay servido en ${host} ${port}`)
  socket.destroy()
  process.exit(1) // código 1 para error, 0 para éxito
})

/**
 * Cierre del socket
 */
socket.on('close', data => {
  console.log(`El socket se cerró, con data: ${data}`)
  socket.destroy()
  process.exit(0)
})

/**
 * Tomamos entrada de consola
 * y la enviamos por el socket
 */
process.stdin.on('data', data => {
  let input = data.toString()

  if('exit' == input.toLowerCase()) {
    process.stdout.write(`Adios \n`)
    socket.destroy()
    process.exit(0)
  }
  socket.write(data)
})

process.stdin.resume() // mantiene activa la consola
