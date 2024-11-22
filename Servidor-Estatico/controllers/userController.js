/**
 * Tiene como responsabilidad el manejo HTTP de los usuarios
 */

import { isValidUser } from "../lib/validations.js"
import { UserModel } from "../models/userModel.js"

export const userController = async (req, res, payloadEnBruto, urlParts) => {
  /**
   * GET /api/users/{id}
   */

  if(req.method == 'GET' && urlParts[2] && urlParts.length <= 3 ) {
    try {
      let usuario = await UserModel.getById(urlParts[2])

      if(usuario) {
        res.writeHead(200, 'OK', { "content-type": "application/json" })
        res.write(JSON.stringify(usuario))
        res.end()
      } else {
        res.writeHead(404, 'Not Found', { "content-type": "text/plain" })
        res.write('No encontramos al usuario')
        res.end()
      }
    } catch (err) {
      console.log("error usuario", err)
      res.writeHead(500, 'Internal Server Error', { "content-type": "text/plain" })
      res.write('Error del servidor')
      res.end()
    }
  }

  /**
   * POST /api/users + payload
   */
  else if (req.method == 'POST' && payloadEnBruto) {
    try {
      let user = JSON.parse(payloadEnBruto)
      if(!isValidUser(user)) throw new Error('Usuario Inválido');

      let fueCreado = await UserModel.create(user.telefono, user)
      if(fueCreado) {
        res.writeHead(201, 'Created', { "content-type": "text/plain" })
        res.end('Usuario Creado exitosamente')
      } else {
        /**
         * @TODO analizar posibles errores capturados
        */
        res.writeHead(409, 'Conflict', { "content-type": "text/plain" })
        res.end('Usuario ya existía')
      }
    } catch (err) {
      res.writeHead(400, 'Bad Request', { "content-type": "text/plain" })
      res.end('No se puede crear usuario')
    }
  }

  /**
   * DELETE /api/users/id
   */
  else if (req.method == 'DELETE' && urlParts[2]) {
    // TODO
    // FIXME: No borra usuarios
    await UserModel.delete(urlParts[2])

    res.writeHead(200, 'OK', { "content-type": "application/json" })
    res.end(JSON.stringify({ status: 'deleted' }))
  }

  /**
   * PUT /api/users/id  + payload
   */
}
