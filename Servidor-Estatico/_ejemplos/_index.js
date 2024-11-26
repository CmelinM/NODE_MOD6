/**
 * Levanta servidor y enruta las solicitudes
 */

import * as http from 'node:http'
import { createFile } from '../lib/data.js'
import path from 'node:path'
import * as fs from 'node:fs/promises'
import * as mime from 'mime-types'
import { userController } from '../controllers/userController.js'

const port = process.argv[2] || 3000

const server = http.createServer((req, res) => {
  /**
   * "Llenar el contenido de la solicitud según llega"
   */
  let rawPayload = ''
  req.on('data', chunk => {
    rawPayload += chunk
  })

  /**
   * Ya llegó toda la información
   */
  req.on('end', async () => {
    console.log("URL", req.url)
    let urlParts = req.url.split('/').filter(part => !!part)

    /**
     * Separamos entre ficheros públicos y API
     */
    if(urlParts[0].toLowerCase() != 'api') {
      /**
       * Carpeta Pública
       */
      try {
        console.log('Caso público')
        let rutaRecurso = path.join('public', ...urlParts)
        let data = await fs.readFile(rutaRecurso, { encoding: 'utf8' })
  
        let MIMEType = mime.lookup(rutaRecurso)
  
        res.writeHead(200, 'OK', { "content-type": MIMEType })
        res.write(data)
        res.end()
      } catch (error) {
        console.log('caso not found público')
        res.writeHead(404, 'Not Found', { "content-type": "text/plain" })
        res.end('Archivo no encontrado')
      }
    } else if (urlParts[0].toLowerCase() === 'api') {
      /**
       * Enrutamos al API y controlador correspondiente
       */
      if(urlParts[1] == 'users') {
        userController(req, res, rawPayload, urlParts)
      }

      if(urlParts[1] == 'products') {
        /**
         * Controlador de productos
         */
      }
    }

  })
})

server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
})

server.on('error', (err) => {
  createFile('.data/', 'error.json', err)
  server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
  })
})