/**
 * Analizar url de la solicitud y dirigirla al controlador correspondiente
 */

import { userController } from "./controllers/userController.js"
import { publicController } from "./controllers/publicController.js"
import { productsController } from "./controllers/productsController.js"
import { beatlesController } from "./controllers/beatlesController.js"

export const router = (req, res) => {
  const url = req.url
  const urlParts = url.split('/').filter(part => !!part).map(part => part.split('?')[0])
  /**
   * https:// -> protocolo
   * localhost -> dominio (servidor)
   * :3000 -> puerto 
   * ruta/al/recurso -> ruta
   * ?query=seach -> texto de consulta
   * 
   * http://localhost:3000/api/beatles?name=white....
   * let _url = new URL(req.url, `https://${req.headers.host}`)
   * let queryParams = _url.searchParams
   * console.log(queryParams)
   * console.log(urlParts)
    */
  /** */
  let payloadBruto = '' // @todo generar payload desde evento data

  req.on('data', chunk => {
    payloadBruto += chunk
  })

  req.on('end', () => {
    /**
     * /public
     */
    if(urlParts[0] != 'api') {
      publicController(req, res, urlParts)
    } 
    /**
     * Ruta API Usuarios
     * /api/users
     * urlParts = ["api", "users"]
     */
    else if ( urlParts[0] == 'api' && urlParts[1] == 'users' ) {
      userController(req, res, payloadBruto, urlParts)
    }
    /**
     * Ruta Productos
     */
    else if (urlParts[0] == 'api' && urlParts[1] == 'productos') {
      productsController(req, res, payloadBruto, urlParts)
    }
    /**
     * Ruta Beatles
     * localhost:3000/api/beatles
     */

    else if (urlParts[0] == 'api' && urlParts[1] == 'beatles') {
      beatlesController(req, res, payloadBruto, urlParts)
    }
    /**
     * 404 not found
     */
    else {
      res.writeHead(404, 'Not Found', { "content-type": "text/plain" })
      res.end('No encontrado')
    }
  })
}