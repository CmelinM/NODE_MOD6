/**
 * Tiene como responsabilidad el manejo HTTP de los usuarios
 */

import { UserModel } from "../models/userModel.js"

export const userController = async (req, res, payloadEnBruto, urlParts) => {
  /**
   * GET /api/users/id
   * [ 'api', 'users', 'id', 'otroParam' ]
   *     0        1     2       3
   *     1        2     3       4
   * id = 854332654
   * id = 854331254
   * id = 44444444
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
   * POST /api/users
   */

  /**
   * DELETE /api/users/id
   */

  /**
   * PUT /api/users/id  + payload
   */
}
