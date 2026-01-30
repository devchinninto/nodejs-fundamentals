// stdin is everything the user types on the terminal.

// That means that everything I receive (stdin), I forward using 'pipe()' to somewhere else, in this case, stdout.
// process.stdin.pipe(process.stdout)

// Buffer is a way to transition data within Node

// Creating a stream from scratch
import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
  
  // Readable streams provide information. Whereas Writable streams receive the information from the Readable, and does something with the data. stdout is an example of Writable stream.
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        // push() is the method that readable streams use to send information
        this.push(null)
      } else {
        // 'i' is the 'chunck argument' and cannot be a primitive type, so I need to create a Buffer.
        const buf = Buffer.from(String(i))
  
        this.push(buf)
      }
    }, 1000)
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding,callback) {
    const transformed = Number(chunk.toString()) * -1

    // The first param of the callback is an error.
    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplyByTenStream extends Writable {
    // Chunk is the pieces of data received from the Readable stream. Encoding is how that information is encoded, and callback is a function what my Writable stream will call after it has finished processing the information.

    // A Writable stream only PROCESSES the data, it doesn't transform it - the stream that transforms the data is another one.

  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToHundredStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenStream())