/**
 * Analizar url de la solicitud y dirigirla al controlador correspondiente
 */

import { userController } from "./controllers/userController.js"
import { publicController } from "./controllers/publicController.js"
import { productsController } from "./controllers/productsController.js"

export const router = (req, res) => {
  const url = req.url
  const urlParts = url.split('/').filter(part => !!part)

  let payloadBruto = '' // @todo generar payload desde evento data

  req.on('data', chunk => {
    payloadBruto += chunk
  })

  req.on('end', () => {
    /**
     * /public
     */
    console.log(req.method, req.url)
    if(urlParts[0] != 'api') {
      publicController(req, res, urlParts)
    } 
    /**
     * Ruta API Usuarios
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
     * 404 not found
     */
    else {
      res.writeHead(404, 'Not Found', { "content-type": "text/plain" })
      res.end('No encontrado')
    }
  })
}