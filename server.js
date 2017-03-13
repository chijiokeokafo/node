const http = require('http');

var server = http.createServer(function(req, res){
	res.writeHead(200);
	res.end('Hello Http');
});

console.log('Starting up node.js server!')
server.listen(8080);