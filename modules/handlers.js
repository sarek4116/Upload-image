var formidable = require('formidable');
var fs = require('fs');

exports.upload = function (request, response) {
	console.log('I start handling the upload request.');
	var form = new formidable.IncomingForm();
	form.parse(request, function (error, fields, files) {
		console.log(files);
		fs.renameSync(files.upload.path, 'test.png');
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write('received image:<br/>');
		response.write('<img src="/show"/>');
		response.end();
	});
}

exports.show = function (request, response) {
	fs.readFile('test.png', "binary", function (error, file) {
		response.writeHead(200, {"Content-Type": "image/png"});
		response.write(file, "binary");
		response.end();
	});
}


exports.welcome = function (request, response) {
	console.log('I starting handling the welcome request.');
	fs.readFile('templates/start.html', function (err, html) {
		response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
		response.write(html);
		response.end();
	});
}

exports.style = function(request,response) {
	fs.readFile('css/style.css', function (err,css) {
		response.writeHead(200, {"Content-Type": "text/css;"});
		response.write(css);
		response.end();
	}
	)}

exports.error = function (request, response) {
	console.log('I do not know what to do!');
	response.write('404 :(');
	response.end();
}