/**
 * Servidor HTTP, sobre módulo net de node
 */

import * as net from 'node:net'
import * as fs from 'node:fs/promises'

const port = process.argv[2] || 8080

const respuesta = async (codeHTTP, mime, file) => {
  const body = file ? file : Buffer.from(`<h1>Error</h1>`)
  const head = `HTTP/1.0 ${codeHTTP}\r\nContent-Type: ${mime}\r\nContent-Length: ${body.length}\r\n\r\n`

  return Buffer.concat([Buffer.from(head), body])
}

const server = net.createServer(socket => {
  /**
   * Manejo de error
   */
  socket.on('error', () => {
    process.stderr.write(`Socket desconectado\n\n`)
    socket.destroy()
  })

  /**
   * Entrada de datos
   */
  socket.on('data', async data => {
    /**
     * Tomamos cabeceras y cuerpo de la solicitud
     */
    const [head, body] = data.toString().split('\r\n\r\n')

    const primeraLinea = head.split('\r\n')[0]
    const [metodo, recurso] = primeraLinea.split(' ')

    const rutaRecurso = 'public' + recurso;
    
    if(metodo.toLowerCase() == 'get') {
      try {
        const htmlBuffer = await fs.readFile(rutaRecurso)
        const respuestaBuffer = await respuesta('200', 'text/html', htmlBuffer)
        socket.write(respuestaBuffer)
      } catch (error) {
        
      }
    }

  })
})

server.listen(port)
