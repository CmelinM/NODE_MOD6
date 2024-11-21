import * as HTTP from 'node:http'
import * as fs from 'node:fs/promises'

const port = process.argv[2] || 8080

const server = HTTP.createServer(async (req, res) => {
  const filePath = 'public' + req.url
  
  try {
    const fileBuffer = await fs.readFile(filePath)
    res.writeHead(200, 'OK', {
      'content-type': 'text/html',
      "content-length": fileBuffer.length
    })

    res.end(fileBuffer)
  } catch (error) {
    res.statusCode(400)
    res.end('error')
  }
})

server.listen(port, () => console.log(`Server en puerto ${port}`))
