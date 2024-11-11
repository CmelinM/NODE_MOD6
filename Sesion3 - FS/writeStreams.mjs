import * as fs from 'node:fs/promises'
import { stdin } from 'node:process'
import { createWriteStream } from 'node:fs'

// Evita pausar el stdin
stdin.resume()

stdin.setEncoding('utf8')
console.log(`Iniciando programa`)

const writeStream = createWriteStream('streamOutput.txt')

stdin.on('data', (chunk) => {
  // Mostramos data recibida
  console.log(`Data recibida: ${chunk}`)

  if(chunk.toString().trim() == 'end') {
    stdin.emit('end')
  }

  writeStream.write(chunk, err => {
    if (err) {
      console.log(err)
      process.exit(1)
    }
  })
})

stdin.on('end', () => {
  console.log('Fin')
  process.exit(0)
})




