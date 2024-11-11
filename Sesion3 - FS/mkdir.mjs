import * as fs from 'node:fs/promises'
import path from 'node:path'

const folder = '/Users/user/Downloads'
const downloadsURL = path.join(path.posix.dirname(folder), path.posix.basename(folder))

try {
  await fs.mkdir(path.join(downloadsURL, 'comprimidos'))
  console.log('Creada carpeta comprimidos')

  let files = await fs.readdir(downloadsURL)

  for(let file of files) {
    const filePath = path.join(downloadsURL, file)

    let stats = await fs.stat(filePath)
    if (stats.isDirectory()) {
      console.log(file, "es directorio")
    }
  }
} catch (error) {
  console.error(error)
}