import http from 'node:http'

// Stateful=> Sempre vai ter algum tipo de informacão guardada em memória 
// dependendo das mesmas para que ela continue funcionando
// Stateless => diferente da Statteful ela nao gusrda nada na memória e sim em 
// dispositivos externos como banco de dados ou arquivos de texto
//Cabeçalhos (requisição/resposta) => Metadados

const users = []

const server = http.createServer((req,res) => {
  const {method, url} = req

  if (method === 'GET' && url ==='/users') {
    return res
    .setHeader('Content-type', 'application/Json')
    .end(JSON.stringify(users))
  }

  if (method === 'POST' && url ==='/users') {
    users.push({
      id: 1,
      nome: 'Felipe Souza',
      email: 'felipe123@gmail.com'
    })
    return res.writeHead(201).end()
  }
  return res.writeHead(404).end()
})

server.listen(3333)
