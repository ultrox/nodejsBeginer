//this is where routing will end 
//when user ask for /start path, start function needs to handle that
var querystring = require("querystring");
var fs = require('fs');
var formidable = require('formidable');

function start(response) {
	function sleep(ms) {
		var startTime = new Date().getTime();
		while(new Date().getTime() < startTime + ms);
	}

	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" '+
		'content="text/html; charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" method="post" enctype="multipart/form-data">'
		+
		'<input type="file" name="upload" />'
		+
		'<input type="submit" value="Submit file" />'
		+
		'</form>'+
		'</body>'+
		'</html>';


	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body)
	response.end();

}
function show(response) {
	console.log('Request handle "show" was called');
	response.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream("/tmp/test.png").pipe(response);
}

function upload(response, request){
	console.log("Request handler 'upload' was called.");
	var form = new formidable.IncomingForm();
	console.log('about to parse');
	form.parse(request, function(error, fields, files) {
		console.log('parsing done');
		if(files.upload) {
			fs.rename(files.upload.path, '/tmp/test.png', function(error) {
				if(error) {
					fs.unlink("/tmp/test.png");
					fs.rename(files.upload.path, "/tmp/test.png");
				}
			})
		}
	})

	response.writeHead(200, {"Content-Type": "text/html"});

	response.write('received image: <br />');
	response.write('<img src="/show" />');
	response.end();
}

function marko(response) {
	var msg = 'Request handler "marko" was called'
	response.writeHead(200, {"Content-Type": "text/plain"})
	response.write(msg);
	response.end();
}


exports.start = start;
exports.upload = upload;
exports.marko = marko;
exports.show = show;
