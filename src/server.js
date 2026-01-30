import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

const PORT = 3333

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path === url
  })

  console.log(route)

  if (route) {
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}!`))