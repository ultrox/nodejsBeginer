var server = require('./server.js');
var router = require('./router');
var requestHandlers = require('./requestHandlers');


var handle = {};
handle['/']       = requestHandlers.start;
handle['/start']  = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/marko']  = requestHandlers.marko;

//zato sto server treba glagol, ne imenicu :D
server.start(router.route, handle);
