var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		request.setEncoding('utf-8');
		//non blocking request receiving small chunk of data and triggering data event
		request.addListener('data', function(postDataChunk) {
			postData += postDataChunk;
			console.log("received POST data chunk '");
		})
		//listener when post data is finish transimiting
		request.addListener('end', function() {
			console.log('i will route you now')
			//injecting Dependencies but only verb, not a noun
			route(handle, pathname, response, postData);
		})
	}

	http.createServer(onRequest).listen(8888);
	console.log("Zuuuummm - Server Started");
}

exports.start = start;
