/**
 * Controlador del recurso Beatles
 */

import { BeatlesModel } from "../models/beatlesModel.js"
import * as crypto from 'node:crypto'

export const beatlesController = async (req, res, payloadBruto, urlparts) => {
  /**
   * Listar todos los discos
   * /api/beatles /....
   */
  if(req.method == 'GET' && !urlparts[2]) {
    try {
      let discos = await BeatlesModel.getAll()
  
      res.writeHead(200, 'OK', { "content-type": "application/json" })
      res.end(JSON.stringify(discos))
    } catch (err) {
      res.writeHead(500, 'Internal Server Error', { "content-type": "application/json" })
      res.end(JSON.stringify({ message: err.message }))
    }
  }
  /**
   * Mostrar disco por ID
   * /api/beatles/:id
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
   * Mostrar disco por nombre
   */

  /**
   * Crear discos
   * 
   * /api/beatles /...
   */
  else if(req.method = 'POST' && !urlparts[2]) {
    try {
      let disco = JSON.parse(payloadBruto)
      let id = crypto.randomUUID()

      /**
       * 1- Leer el archivo
       * 2- Agregar disco con id
       * 3- Guardar data en el archivo
       * 4- Enviar respuesta de éxito
       */
    } catch (err) {
      res.writeHead(400, 'Bad Request', { "content-type": "application/json" })
      res.end(JSON.stringify({ message: 'Solicitud mal hecha'}))
    }
  }
  /**
   * Actualizar discos
   */

  /**
   * Borrar discos
   */
}