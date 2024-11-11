import * as fs from 'node:fs/promises'
import { stdin } from 'node:process'
import { Buffer } from 'node:buffer'

stdin.resume()

stdin.setEncoding('utf8')

let inputData = ''

stdin.on('data', chunk => {
  if (chunk.toString().trim() == 'end') {
    stdin.emit('end')
  }

  inputData += chunk
})

stdin.on('end', async () => {
  const buffer = Buffer.from(inputData)

  console.log("datos leídos", buffer)

  await fs.writeFile('salida.txt', buffer)
})


