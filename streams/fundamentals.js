//streams -> 

// process.stdin       // tudo que estou recebendo de entrada(stream de leitura)
//   .pipe(process.stdout)     //o pipe esta encaminhando // ().stdout) uma saida (stream de escrita)


import {Readable,Writable, Transform} from 'node:stream'

class oneToHundredStream extends Readable {
  index = 1
  _read() {
    const i =this.index++
    setTimeout(() => {
      if (i > 100) {
      this.push(null)
    } else {
      const buf = Buffer.from(String(i))
      this.push(buf)
    }
    }, 1000)
  }
}

class inverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const Transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(Transformed)))
  }
}

class multiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }

}

new oneToHundredStream()         //Stream de leitura
  .pipe(new inverseNumber())     //Stream de transformação    
  .pipe(new multiplyByTenStream()) //Stream de escrita