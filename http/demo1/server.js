
const http = require('http')

http.createServer(function(req, res){
  console.log(req.headers)
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('powered', 'Jirengu');
  res.setHeader('Set-Cookie', ['id=123456']);
  res.statusCode = 404;
  res.statusMessage = 'hello world'
  //res.writeHead(200, 'Not Found',{ 'Content-Type': 'text/plain' });
  res.end('<h1>hello world</h1>')
}).listen(8080)
