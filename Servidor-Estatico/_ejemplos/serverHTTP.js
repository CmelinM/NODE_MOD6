/**
 * Servidor HTTP
 * con módulo HTTP de node
 */

import * as http from 'node:http'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

const port = process.argv[2] || 8080

const server = http.createServer(async (req, res) => {
  const method = req.method

  if('get' != method.toLowerCase()) {
    res.statusCode = 400
    res.write('<h1>Error 400 Bad Request</h1>')
    res.end()
  } else {
    try {
      const headers = req.headers
      const body = req.body
      /** 
       * url 
       * 
       * Protocolo -> http, ftp, 
       * Host -> servidor IP o Nombre Dominio
       * Recurso (ruta) -> /sistema/carpetas
       * Puerto -> :8080
       * 
       * http://www.google.cl:8080/ruta/al/recurso
       */
      const reqUrl = req.url // Recurso a obtener
  
      /**
       * Leemos archivo
       * reqUrl -> '/index.html' solicitado por Cliente
       * 
       * '/index.html' -> '/public/index.html'
       */
      const fileData = await fs.readFile(path.join('public', reqUrl))
  
      /**
       * Armamos respuesta
       */
      res.setHeader('Content-Type', 'text/html')
      res.write(fileData)
      res.end()
    } catch (err) {
      res.statusCode = 404
      res.write('<h1>Error 404 Not Found</h1>')
      res.end()
    }
  }

})

server.listen(port, () => {
  console.log(`Servidor en puerto ${port}`)
})