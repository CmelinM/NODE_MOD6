import * as fs from 'node:fs/promises'
import path from 'node:path'

const folder = '/Users/user/Downloads'
const downloadsURL = path.join(path.posix.dirname(folder), path.posix.basename(folder))

const ZIP_EXTENSIONS = [ '.gz', '.7z', '.zip', '.zipx' ]

try {
  const files = await fs.readdir(path.join(path.posix.dirname(folder), path.posix.basename(folder)))

  const extensions = new Set(files.map(fileName => path.posix.extname(fileName)))

  const zippedFiles = files.filter(file => ZIP_EXTENSIONS.includes(path.posix.extname(file)))

  console.log(zippedFiles)
} catch (err) {
  console.error(err)
}