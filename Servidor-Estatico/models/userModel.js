/**
 * Modelo de usuarios
 */

/**
 * Dependencias, lib/data.js que se comunica con FS
 */
import { createFile, deleteFile, updateFile, readFile } from "../lib/data";

/**
 * Class UserModel que define las acciones de los usuarios en el FS
 */

class UserModel {
  constructor() {
    this.folder = '.data/usuarios'
  }

  static async create(userId, data) {

  }

  static async delete(userId) {}

  static async update(userId, data) {}

  static async getById(userId) {}
}
