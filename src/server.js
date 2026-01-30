import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

// Query Parameters: Optional filters appended after ? in URL
// Format: ?key1=value1&key2=value2
// Example: http://localhost:3333/users?userId=1&name=Marcelle
// Use case: Pagination, filtering - stateless, named parameters
// Security: Never transmit sensitive data (passwords, tokens) in query params

// Route Parameters: Dynamic path segments that identify specific resources
// Format: /resource/:id where :id is a placeholder
// Example: http://localhost:3333/users/1 (1 is the route parameter)
// Use case: REST resource identification
// Security: Also exposed in URL, avoid sensitive information

// Request Body: Structured data sent in POST/PUT requests
// Use case: Form submissions, creating/updating resources
// More secure than URL params - not visible in browser history or logs
// Typically JSON format

const PORT = 3333

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    console.log(routeParams)

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}!`))