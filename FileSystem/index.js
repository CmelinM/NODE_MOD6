// Sistema POSIX

// fs/promises
// fs   -> callbacks

import * as fs from 'node:fs/promises'
import path from 'node:path'

/**
 * c:\Users\<nombre_usuario>\Downloads\...
 */

// const CARPETA_DESCARGAS = 'c:\Users\user\Downloads'
// const CARPETA_DESCARGAS = '/Users/user/Downloads'
const CARPETA_DESCARGAS = import.meta.dirname

const ruta = path.posix.dirname(CARPETA_DESCARGAS)
const base = path.posix.basename(CARPETA_DESCARGAS)

// console.log(ruta)
// console.log(base)

let URL_DESCARGAS = path.posix.join(ruta, base)

let files = await fs.readdir(path.posix.join(ruta, base))

let archivos = files.filter(async file => {
  const fileUrl = path.posix.join(URL_DESCARGAS, file)

  let stats = await fs.stat(fileUrl)
  
  return !stats.isDirectory()
})

let archivosPromises = files.map(async file => {
  const fileUrl = path.posix.join(URL_DESCARGAS, file)
  
  return [await fs.stat(fileUrl), file]

} )

console.log((await Promise.all(archivosPromises)).map(data => [data, data[0].isDirectory()]))

/**
 * Obtener extension de los archivos
 */

let extensiones = archivos.map(file => path.posix.extname(file))
let unicas = new Set(extensiones)

console.log([...unicas])

// for(let file of files) {
//   console.log(file)
// }

for(let file of files) {
  const fileUrl = path.posix.join(URL_DESCARGAS, file)

  let stats = await fs.stat(fileUrl)

  /**
   * Analizamos si el path es directorio
   */
  // if(stats.isDirectory()) {
  //   console.log(fileUrl, "Es un directorio")
  // }

  /**
   * Analizamos extensión
   */
  // console.log(path.posix.extname(file))
}


const extFiles = files.map(file => path.posix.extname(file))

// console.log(extFiles)

let extesionesUnicas = new Set(extFiles)

// console.log([...extesionesUnicas])

