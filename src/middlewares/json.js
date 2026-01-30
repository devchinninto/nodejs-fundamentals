export async function json(req, res) {
  // Initialize array to accumulate incoming request body chunks
  // Each chunk is a Buffer containing a portion of the request payload
  const buffers = []

  // for-await-of loop: Consumes the request stream chunk by chunk
  // Node.js automatically handles backpressure - pauses reading if buffers fill up
  // Loop continues until stream emits 'end' event (when all request data is received)
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  // Try to parse request body as JSON
  // Buffer.concat() merges all chunks into one contiguous buffer
  // .toString() converts buffer to UTF-8 string (default encoding)
  // JSON.parse() deserializes string to JavaScript object
  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())

  } catch {
    // Set req.body to null if JSON parsing fails (invalid or missing body)
    // Prevents downstream code from breaking when trying to access req.body properties
    req.body = null
  }

  res.setHeader('Content-type', 'application/json')
}