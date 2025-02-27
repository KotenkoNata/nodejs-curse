const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello World! NODE');
})

server.listen(8080);