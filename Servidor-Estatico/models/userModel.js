/**
 * Modelo de usuarios
 */

/**
 * Dependencias, lib/data.js que se comunica con FS
 */
import { createFile, deleteFile, updateFile, readFile } from "../lib/data.js";

/**
 * Class UserModel que define las acciones de los usuarios en el FS
 */

class UserModel {
  static folder = '.data/usuarios'

  static async create(userId, data) {
    let estado
    try {
      estado = await createFile(UserModel.folder, `${userId}.json`, data)
    } catch (err) {
      console.error("Error Creando Usuario", err)
      estado = false
    } finally {
      return estado
    }
  }

  static async delete(userId) {
    try {
      await deleteFile(UserModel.folder, `${userId}.json`)
      console.log("Usuario Borrado")
    } catch (err) {
      console.error("Error borrando archivo", err)
    }
  }

  static async update(userId, data) {
    const user = await UserModel.getById(userId)

    let keys = Object.keys(data)

    /**
     * Actualizamos usuario en base a "llaves" de la data
     */
    for( let key of keys ) {
      user[key] = data[key]
    }

    await updateFile(UserModel.folder, `${userId}.json`, user)
  }

  
  /**
   * Obtiene usuario por Id
   *
   * @static
   * @async
   * @param {string} userId - Identificador de usuario
   * @returns {Promise<object>} - Retorna usuario
   */
  static async getById(userId) {
    try {
      const user = await readFile(UserModel.folder , `${userId}.json`)
      return user
    } catch (err) {
      console.error("No se pudo obtener al usuario", err)
    }
  }
}

export { UserModel }
