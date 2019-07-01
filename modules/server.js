var http = require('http');
var colors = require('colors');

var handlers = require('./handlers');

function start() {
	function onRequest (request, response) {
		console.log('An inquiry was received.'.green);
		console.log('An inquiry' + request.url + 'was received');

		response.writeHead(200, {"Content-type": "text/plain; charset=utf-8"});
		
		switch (request.url) { 
	        case '/':
	        case '/start':
	            handlers.welcome(request, response);
	            break;
	        case '/upload':
	            handlers.upload(request, response);
	            break;
	        case '/show' :
				handlers.show(request, response);
				break;
			 case '/style' :
				handlers.style(request, response);
				break;
	        default:
	            handlers.error(request, response);
	    }
	}

	http.createServer(onRequest).listen(9000);
	console.log('Server started!'.green);
}

exports.start = start; 