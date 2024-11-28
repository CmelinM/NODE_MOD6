/**
 * Grabamos o leemos datos relativos a Los Beatles
 */

import {
  createFile,
  deleteFile,
  updateFile,
  readFile,
  fileExists,
  listAll,
} from "../lib/data.js";

export class BeatlesModel {
  static folder = '.data/'
  static fileName = 'beatles.json'

  static async getAll() {
    let discos = await readFile(BeatlesModel.folder, BeatlesModel.fileName)

    return discos
  }

  static async getById(id) {
    let discos = await BeatlesModel.getAll()

    return discos[id]
  }
}