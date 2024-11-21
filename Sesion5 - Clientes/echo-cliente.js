/**
 * Cliente Echo
 */

import * as net from 'node:net'

const host = process.argv[2] || 'localhost'
const port = process.argv[3] || 7

const socket = net.createConnection({ host, port })

process.stdin.on('data', data => {
  socket.write(data)
})

socket.on('data', data => {
  process.stdout.write(`\nRespuesta:\n${data}\n`)
})

socket.on('error', err => {
  console.error(`No hay servidor en ${host} ${port}`)
  socket.destroy()
  process.exit(1)
})
