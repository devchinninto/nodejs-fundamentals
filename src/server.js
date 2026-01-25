import http from 'node:http'
import { json } from 'node:stream/consumers'

const PORT = 3333

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if(method === 'GET' && url === '/users') {
    // Early return
    return res
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users))
  } 
  

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'email@example.com'
    })
    return res.end('New user.')
  }
  
  return res.end('Hello, world!')
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}!`))