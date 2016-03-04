var http = require("http");
var url  = require("url");
function start(route,handle) {
	function onRequest(request, response){
	console.log("request received");
	var pathname = url.parse(request.url).pathname;
	console.log("request for " + pathname + "received");
	route(handle,pathname,response, request);
	// request.setEncoding("utf8");
	// var postData = "";
	// request.addListener("data",function(postDataChunk) {
	// 	postData += postDataChunk;
	// 	console.log("received POST data chunk " + postDataChunk + " .");
	// });
	// request.addListener("end",function() {
	// 	route(handle,pathname,response, postData);
	// });

}
	http.createServer(onRequest).listen(8888);
	console.log("Server has started");
}
function callback(content,response) {
	response.write(content);
}
exports.start = start;
exports.callback = callback;
