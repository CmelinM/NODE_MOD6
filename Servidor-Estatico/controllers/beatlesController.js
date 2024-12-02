/**
 * Controlador del recurso Beatles
 */

import { BeatlesModel } from "../models/beatlesModel.js"
import * as crypto from 'node:crypto'
import * as url from "node:url"

export const beatlesController = async (req, res, payloadBruto, urlparts) => {
  // let url = new URL(req.url, `https://${req.headers.host}`)
  // let queryParams = url.searchParams
  const queryParams = url.parse(req.url, true);

  /**
   * Listar todos los discos
   * /api/beatles /....
   */
  if(req.method == 'GET' && !urlparts[2] && !queryParams.search) {
    try {
      let discos = await BeatlesModel.getAll()
  
      res.writeHead(200, 'OK', { "content-type": "application/json" })
      return res.end(JSON.stringify(discos))
    } catch (err) {
      res.writeHead(500, 'Internal Server Error', { "content-type": "application/json" })
      return res.end(JSON.stringify({ message: err.message }))
    }
  }
  /**
   * Con queryString
   * /api/beatles?nombre=<nombre_disco>
   */
  else if(req.method == 'GET' && !urlparts[2] && queryParams.search) {
    const  {nombre} = queryParams.query;
    const discos = await BeatlesModel.getAll()

    let ids = Object.keys(discos)

    for(let id of ids) {
      let disco = discos[id]

      if (!disco.titulo.toLowerCase().includes(nombre.toLocaleLowerCase())) {
        delete discos[id]
      }
    }

    let remainingKeys = Object.keys(discos)

    if(remainingKeys.length == 0) {
      res.writeHead(404, 'Not Found', { "content-type": "application/json" })
      return res.end(JSON.stringify({ message: 'No se encontraron discos' }))
    } else {
      res.writeHead(200, 'OK', { "content-type": "application/json" })
      return res.end(JSON.stringify(discos))
    }

  }
  /**
   * Mostrar disco por ID
   * /api/beatles/:id
   * /api/beatles/asd0aosud-qsdq1-1-sd
   */
  else if (req.method == 'GET' && urlparts[2] && urlparts.length <= 3 ) {
    let disco = await BeatlesModel.getById(urlparts[2])

    if(disco) {
      res.writeHead(200, 'OK', { "content-type": "application/json" })
      res.end(JSON.stringify(disco))
    } else {
      res.writeHead(404, 'Not Found', { "content-type": "application/json" })
      res.end(JSON.stringify({ message: 'Disco no encontrado' }))
    }
  }
  /**
   * Crear discos
   * 
   * /api/beatles
   */
  else if(req.method == 'POST' && !urlparts[2]) {
    try {
      let data = JSON.parse(payloadBruto) // Puede fallar y levantar un error
      let id = crypto.randomUUID()

      /**
       * 1- Leer el archivo
       * 2- Agregar disco con id
       * 3- Guardar data en el archivo
       * 4- Enviar respuesta de éxito
       */
      let discos = await BeatlesModel.getAll() // 1
      discos[id] = data //2

      let status = await BeatlesModel.createAndUpdateDisc(discos)
      if(status) {
        res.writeHead(201, 'Created', { "content-type": "application/json" })
        res.end(JSON.stringify({ message: 'Disco Creado' }))
      } else {
        res.writeHead(500, 'Internal Server Error', { "content-type": "application/json" })
        res.end(JSON.stringify({message: 'Error interno al crear disco'}))
      }
    } catch (err) {
      res.writeHead(400, 'Bad Request', { "content-type": "application/json" })
      res.end(JSON.stringify({ message: 'Solicitud mal hecha'}))
    }
  }
  /**
   * Actualizar discos
   * 
   * PUT /api/beatles/:id
   * payload
   */
  else if ( req.method == 'PUT' && urlparts[2] ) {
    try {
      let discos = await BeatlesModel.getAll()
      let disco = await BeatlesModel.getById(urlparts[2])

      // @TODO: realizar validaciones para payload de actualizar disco

      if(disco) {
        try {
          let payload = JSON.parse(payloadBruto)
          disco = { ...disco, ...payload } // disco (singular) actualizado
          discos[urlparts[2]] = disco // Actualizamos todos los discos

          await BeatlesModel.createAndUpdateDisc(discos)

          res.writeHead(200, 'OK', { "content-type": "application/json" })
          return res.end(JSON.stringify({ message: 'updated', disco }))
        } catch (err) {
          res.writeHead(400, 'Bad Request', { "content-type": "application/json" })
          return res.end(JSON.stringify({ message: 'Payload mal formado' }))
        }
      } else {
        res.writeHead(404, 'Not Found', { "content-type": "application/json" })
        return res.end(JSON.stringify({ message: 'Disco no encontrado' }))
      }
    } catch (err) {
      res.writeHead(500, 'Internal Server Error', { "content-type": "application/json" })
      return res.end(JSON.stringify({ message: 'Error interno de servidor' }))
    }
  }

  /**
   * Borrar discos
   * DELETE /api/beatles/:id
   */
  else if( req.method == 'DELETE' && urlparts[2] ) {
    let discos = await BeatlesModel.getAll()

    let ids = Object.keys(discos)
    if(ids.includes(urlparts[2])) {
      delete discos[urlparts[2]]

      await BeatlesModel.createAndUpdateDisc(discos)

      res.writeHead(200, 'OK', { "content-type": "application/json" })
      return res.end((JSON.stringify({ message: "Disco eliminado con éxito" })))
    } else {
      res.writeHead(404, 'Not Found', { "content-type": "application/json" })
      return res.end(JSON.stringify({ message: "Disco no encontrado" }))
    }
  }
}