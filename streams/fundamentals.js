// stdin is everything the user types on the terminal.

// That means that everything I receive (stdin), I forward using 'pipe()' to somewhere else, in this case, stdout.
// process.stdin.pipe(process.stdout)

// Creating a stream from scratch
import { Readable, Writable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
  
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

new OneToHundredStream().pipe(process.stdout)