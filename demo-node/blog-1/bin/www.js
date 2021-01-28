const http = require('http')

const PORT = 3000;

const serverHandler = require('../app');

const server = http.createServer(serverHandler);

server.listen(PORT, () => {
  console.log(`server listening ${PORT} ...`)
})