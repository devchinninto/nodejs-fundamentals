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

const server = http.createServer(async (req, res) => {
  const buffers = []

  // Wait for all data chunks to arrive, then collect them into the buffers array.
  // Nothing below runs until all request data has been fully received.
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  // Concatenate all chunks and convert the result to a string.
  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  // 'res.end' Send the response and signal that the request-response cycle is complete.
  return res.end(fullStreamContent)
  
  // return req
  // .pipe(new InverseNumberStream())
  // .pipe(res)
})

server.listen(PORT, () => console.log('Server running.'))
