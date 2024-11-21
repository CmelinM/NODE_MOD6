/**
 * Mismo programa server estático
 * Generalizado para todo OS con librería mime-types
 */

import * as net from 'node:net'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as mime from 'mime-types'

const port = process.argv[2] || 8080

const response = async (code, mime, file) => {
  const body = file ? file : Buffer.from(`<html><body><h1>Error: ${code}</h1></body></html>`);
  const head = `HTTP/1.0 ${code}\r\nContent-Type: ${mime}\r\nContent-Length: ${body.length}\r\n\r\n`

  return Buffer.concat([Buffer.from(head), body])
}

const server = net.createServer(socket => {
  socket.on('data', async data => {
    /**
     * Separamos Body de Cuerpo en la Solicitud
     */
    const [head, body] = data.toString().split('\r\n\r\n')

    /**
     * Separa primera línea de parámetros
     */
    const [firstLine, ...params] = head.split('\r\n')

    /**
     * asked resource and method
     */
    const [method, askedResource] = firstLine.split(' ').map(data => data.trim())
    const filePath = path.join(import.meta.dirname, 'public' + askedResource)

    if('get' == method.toLowerCase()) {
      process.nextTick(async () => {
        try {
          const fileBuffer = await fs.readFile(filePath)
          const fileMIME = mime.lookup(filePath)
  
          const responseBuffer = await response('200', fileMIME, fileBuffer)
          socket.write(responseBuffer)
        } catch (error) {
          const data = await response('404', 'text/html', Buffer.from(`<p>${error.message}</p>`))
          socket.write(data)
        }
      })
    } else {
      const data = await response('400', 'text/html', Buffer.from(`<p>Bad Request ${method}</p>`))
      socket.write(data)
    }
  } )
})

server.listen(port, () => {
  console.log(`Server funcionando en puerto ${port}`)
})