//this is where routing will end 
//when user ask for /start path, start function needs to handle that
var querystring = require("querystring");
var fs = require('fs');

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
		'<form action="/upload" method="post">'+
		'<textarea name="text" rows="20" cols="60"></textarea>'+
		'<input type="submit" value="Submit text" />'+
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

function upload(response, postData){
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	console.log('sta je postdata', typeof postData);
	response.write("You've sent the text: " + postData);
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
