import * as fs from 'node:fs/promises'
import path from 'node:path'

const DIRECTORIO = import.meta.dirname

let archivos = await fs.readdir(DIRECTORIO)

console.log(archivos)

let extArchivos = [ '.txt', '.jpg' ]

extArchivos.forEach(async ext => {
  let directorioNuevo = ext.replace('.', '')
  try {
    await fs.access(path.posix.join(DIRECTORIO, directorioNuevo ))
    
    console.log("El directorio existe")
  } catch (error) {
    await fs.mkdir(path.posix.join(DIRECTORIO, directorioNuevo))
  }

})

// await fs.mkdir(path.posix.join(DIRECTORIO, 'txt'))


for(let archivo of archivos) {
  let extension = path.posix.extname(archivo)
  if( extArchivos.includes(extension)) {
    setTimeout(async () => {
      await fs.rename(
        path.posix.join(DIRECTORIO, archivo),
        path.posix.join(DIRECTORIO, extension.replace('.', ''), archivo)
      )
    }, 0)
  }
}