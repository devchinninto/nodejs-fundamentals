import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    // The first param of the callback is an error.
    callback(null, Buffer.from(String(transformed)))
  }
}

const PORT = 3334

// Req -> ReadableStream
// Res -> WritableStream

const server = http.createServer((req, res) => {
  return req
  .pipe(new InverseNumberStream())
  .pipe(res)
})

server.listen(PORT, () => console.log('Server running.'))
