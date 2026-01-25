import http from 'node:http'

const PORT = 3333

const server = http.createServer((req, res) => {
  const { method, url } = req

  if(method === 'GET' && url === '/users') {
    // Early return
    return res.end('Users list.')
  } 
  
  if (method === 'POST' && url === '/users') {
    return res.end('New user.')
  }
  
  return res.end('Hello, world!')
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}!`))