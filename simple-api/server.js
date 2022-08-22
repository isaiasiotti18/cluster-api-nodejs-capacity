import http from 'http'

const processId = process.pid

const server = http.createServer((request, response) => {
  for( let i = 0; i < 1e7; i++ );
  response.end(`Hello World from process ${processId}`)
})

server.listen(3000)
  .once('listening', () => {
    console.log('Server started in process', processId)
  })

// Aguardar as conexoes serem encerradas para só então encerrar o programa

process.on('SIGTERM', () => {
  console.log('Server ending', new Date().toISOString())
  server.close(() => process.exit())
})