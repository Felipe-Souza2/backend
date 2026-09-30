import http from 'node:http'
import { Transform } from 'node:stream'



class inverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const Transformed = Number(chunk.toString()) * -1

    console.log(Transformed)
    
    callback(null, Buffer.from(String(Transformed)))
  }
}

const server = http.createServer( async(req, res) => {
  const buffers = []
  for await (const chunk of req) {
    buffers.push(chunk)
  }
  const fullStreamContent = buffers.concat(buffers).toString()
  console.log(fullStreamContent)
  return res.end(fullStreamContent)

})

server.listen(3334)