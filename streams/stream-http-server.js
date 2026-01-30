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
  // Initialize array to store all incoming data chunks
  const buffers = []

  // for-await-of: Syntactic sugar for consuming async iterables
  // Under the hood, Node.js Streams implement the async iterable protocol
  // Each iteration yields a chunk and pauses until data is available
  // This handles backpressure automatically - the loop waits if internal buffers are full
  // The loop ends when the stream emits 'end' event
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  // Buffer.concat(): Combines multiple Buffer instances into one contiguous memory block
  // This approach accumulates entire request body in memory before processing
  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  // res.end(): Sends response and closes the connection
  // res is a WritableStream
  // Calling end() signals no more data will be written and finalizes the HTTP response
  return res.end(fullStreamContent)
  
  // return req
  // .pipe(new InverseNumberStream())
  // .pipe(res)
})

server.listen(PORT, () => console.log('Server running.'))
