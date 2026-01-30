import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  // Override the _read method to provide data to the readable stream
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 5) {
        // Signal end of stream by pushing null
        this.push(null)
      } else {
        // Convert number to buffer and push to stream
        const buf = Buffer.from(String(i))
     
        this.push(buf)
      }
    }, 1000)
  }
}

fetch('http://localhost:3334', {
  method: 'POST', 
  body: new OneToHundredStream(),
  duplex: 'half'
})
