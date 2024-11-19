/**
 * Librería para Data
 * 
 * Permitir operaciones de (CRUD) al FS
 * 
 * Actuará sobre carpeta oculta ".data/"
 * Todos los archivos tienen la extensión ".json"
 */

import * as fs from 'node:fs/promises'
import * as path from 'node:path'

export const readFile = async (folder, fileName) => {
  /**
   * descriptorArchivo -> Número que representa de forma única el archivo a manipular
   */
  let descriptorArchivo

  try {
    /**
     * Intentamos leer archivo
     */
    const filePath = path.join(folder, fileName);

    descriptorArchivo = await fs.open(filePath)

    console.log("descriptor archivo readFile", descriptorArchivo)
    const data = await fs.readFile(descriptorArchivo, { encoding: 'utf8' })
    return JSON.parse(data)
  } catch (err) {
    /**
     * Enviamos error a consola
     */
    console.error(err)
  } finally {
    /**
     * Cerramos archivo
     */
    if(descriptorArchivo) {
      await descriptorArchivo.close()
    }
  }
}

/**
 * Crea documento con data inicial
 */
export const createFile = async (folder, fileName, data) => {
  /**
   * Definimos ruta
   */
  const filePath = path.join(folder, fileName)
  try {
    const descriptorArchivo = await fs.open(filePath)
    if(descriptorArchivo) {

      descriptorArchivo.close()
      console.log('Documento ya existía')
    }
  } catch (err) {
    console.error(err)
    await fs.writeFile(filePath, JSON.stringify(data), { encoding: 'utf8' })
    console.log('Documento creado')
  }
}

// // @TODO eliminar prueba de createFile
// let user = { telefono: 444444444, nombre: 'IT el payaso' }
// createFile('.data/usuarios', `${user.telefono}.json`, user)

export const updateFile = async (folder, fileName, data) => {
  const filePath = path.join(folder, fileName)
  let descriptorArchivo
  try {
    descriptorArchivo = await fs.open(filePath, 'r+')

    if(!descriptorArchivo) throw new Error('No existe archivo');
    
    try {
      /**
       * Tratamos de escribir
       */
      console.log("descriptor archivo update", descriptorArchivo)
      await fs.writeFile(descriptorArchivo, JSON.stringify(data), { encoding: 'utf8' })
    } catch (err) {
      console.error('Error escribiendo archivo', err)
    }

  } catch (err) {
    console.error("Error leyendo archivo", err)
  } finally {
    if(descriptorArchivo) {
      await descriptorArchivo.close()
    }
  }
}

// @TODO
// Eliminar pruebas de update

// let user = { telefono: 444444444, nombre: 'IT el payaso' }
// console.log(await readFile('.data/usuarios', `${user.telefono}.json`))
// user.nombre = 'Nuevo Nombre'
// await updateFile('.data/usuarios', `${user.telefono}.json`, user)
// console.log(await readFile('.data/usuarios', `${user.telefono}.json`))



export const deleteFile = async (folder, fileName) => {
  try {
    let filePath = path.join(folder, fileName)
    /**
     * Unlink elimina accesos directos (symlink)
     * o elimina archivos en su defecto
    */
    await fs.unlink(filePath)
  } catch (err) {
    console.error("Error eliminando archivo", err)
  }
}
let user = { telefono: 444444444, nombre: 'IT el payaso' }
await deleteFile('.data/usuarios', `${user.telefono}.json`)