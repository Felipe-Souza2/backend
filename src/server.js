import http from 'node:http'
import { json } from '../src/middlewares/json.js'
import { routes } from '../src/middlewares/routes.js'
// Stateful=> Sempre vai ter algum tipo de informacão guardada em memória 
// dependendo das mesmas para que ela continue funcionando
// Stateless => diferente da Statteful ela nao guarda nada na memória e sim em 
// dispositivos externos como banco de dados ou arquivos de texto
//Cabeçalhos (requisição/resposta) => Metadados
// UUID => Unique Universal ID (para gerar id unicos de forma randomica)

const server = http.createServer(async(req,res) => {
  const {method, url} = req
  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path === url
  })
  if (route) {
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)
