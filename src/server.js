import http from 'node:http'
import { json } from './middlewares/json.js'

const PORT = 3333

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    // Early return: Immediately respond and exit the request handler
    // Prevents execution of subsequent if-statements (saves CPU cycles)
    return res.end(JSON.stringify(users))
  }


  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    users.push({
      id: 1,
      name,
      email
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}!`))