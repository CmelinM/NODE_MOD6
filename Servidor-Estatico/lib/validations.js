/**
 * Validaciones
 */

/**
 * Valida estructura del usuario
 * 
 * @param { object } userObject - Usuario a validar
 * @return { boolean }
 */
export const isValidUser = (userObject)  => {
  const llavesMinimasValidas = [ 'telefono', 'nombre', 'apellido', 'EULA' ]
  let llavesObjeto = Object.keys(userObject)
  const traeLlavesMinimas = llavesObjeto.every(llave => llavesMinimasValidas.includes(llave))

  return traeLlavesMinimas && userObject["EULA"] == true && llavesObjeto.length == llavesMinimasValidas.length
}
