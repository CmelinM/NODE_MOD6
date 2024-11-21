let input

process.stdout.write('Bienvenidos al Himalaya')

process.stdin.on('data', (data) =>  {
  input = data.toString().trim()

  if('exit' == input) { 
    process.stdout.write('Chao pescao')
    process.exit()
  }

  process.stdout.write(input)
})
