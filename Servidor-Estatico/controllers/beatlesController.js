/**
 * Controlador del recurso Beatles
 */

import { BeatlesModel } from "../models/beatlesModel.js"

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
   */

  /**
   * Actualizar discos
   */

  /**
   * Borrar discos
   */
}