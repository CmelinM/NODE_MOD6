/**
 * Usage of simple Chat-TCP.js Server
 * 
 * A simplification of IRC
 */

import * as net from 'node:net'
const host = process.argv[2] || 'localhost'
const port = process.argv[3] || 9000

const socket = net.createConnection({port, host})

process.stdin.on('data', data => {
  socket.write(data)
})

socket.on('data', data => {
  process.stdout.write(`\nResponse:\n ${data}`)
})

socket.on('error', err => {
  console.log(`No server at ${host} ${port}`)
  socket.destroy()
  process.exit()
})

process.stdin.resume() // mantain active STDIN
