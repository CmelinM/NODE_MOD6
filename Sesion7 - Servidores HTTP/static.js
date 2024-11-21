/**
 * Éste programa hace uso de comandos unix para obtener el mime-type
 * por lo que no es compatible con Windows.
 */

import * as net from 'node:net'
import * as fs from 'node:fs/promises'
import * as path from "node:path";
import { promisify } from 'node:util';
import child_process from 'node:child_process';

const exec = promisify(child_process.exec)

const port = process.argv[2] || 8080

const response = async (code, mime, file) => {
  const body = file ? file : Buffer.from(`<html><body><h1>Error: ${code}</h1></body></html>`);
  const head = `HTTP/1.0 ${code}\r\nContent-Type: ${mime}\r\nContent-Length: ${body.length}\r\n\r\n`

  return Buffer.concat([Buffer.from(head), body])
}

const server = net.createServer( socket => {
  socket.on('data', async data => {
    /**
     * Separa Cabeza de Cuerpo
     */
    const [head, body] = data.toString().split('\n\r')

    /**
     * Separa primera línea de parámetros
     */
    const [firstLine, ...params] = head.split('\n')
    let [method, pathFile] = firstLine.split(' ').map(text => text.trim())

    pathFile = 'public' + pathFile
    const dirname = import.meta.dirname
    const filePath = path.join(dirname, pathFile)

    if('get' == method.toLowerCase()) {
      try {
        const fileBuff = await fs.readFile(filePath)
        let mime
        if(process.platform != 'win32') {
          const {stdout, stderr} = await exec(`file -b --mime-type ${filePath}`)
          mime = stdout.trim()
          if (stderr.trim()) throw new Error(stderr)
        } else {
          /**
           * Acá hay una implementación para poder enviar sólo texto HTML
           */
          mime = 'text/html'
        }
        const responseBuffer = await response('200', mime, fileBuff)
        socket.write(responseBuffer)
      } catch (err) {
        const errBuffer = Buffer.from(`<p>${err}</p>`)
        const errResponse = await response(`400`, 'text/html', errBuffer)
        socket.write(errResponse)
      }
    }
  })
})


server.listen(port, () => {
  console.log("Server listening on port: ", port)
})
