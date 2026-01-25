import http from 'node:http'

const PORT = 3333

const server = http.createServer((req, res) => {
  return res.end('Hello, world!')
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}!`))