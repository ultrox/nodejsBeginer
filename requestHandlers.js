//this is where routing will end 
//when user ask for /start path, start function needs to handle that
var querystring = require("querystring");

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
		'<form action="/upload" enctype="multipart/form-data" '+
		'method="post">'+
		'<input type="file" name="upload" multiple="multiple">'+
		'<button type="submit">Upload File</button>'+
		'</form>'+
		'</body>'+
		'</html>';


	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();

}

function upload(response,postData){
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("You've sent the text: "+
		querystring.parse(postData).text);
	response.end();
}
// function upload(response, postData) {
// 	var msg = 'Request handler "upload" was called'
// 	response.writeHead(200, {"Content-Type": "text/plain"});
// 	var text = querystring.parse(postData).text;
// 	response.write("You've send text " + querystring.parse(postData).text);
// 	response.end();
// }

function marko(response) {
	var msg = 'Request handler "marko" was called'
	response.writeHead(200, {"Content-Type": "text/plain"})
	response.write(msg);
	response.end();
}


exports.start = start;
exports.upload = upload;
exports.marko = marko;
