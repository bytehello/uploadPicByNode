var exec = require("child_process").exec;
    querystring = require("querystring");
    fs = require("fs");
    formidable = require("formidable");
function start (response,request) {
	console.log("Request handler 'start' was called");
  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

     response.writeHead(200, {"Content-Type": "text/html"});
     response.write(body);
     response.end();
}
function upload (response, request) {
	console.log("Request handler 'upload' was called");
	var form = new formidable.IncomingForm();
	console.log("about to parse\n\n");
	console.log("******************uploading*********************")
	form.on('progress',function(bytesReceived, bytesExpected) {
		var percent = bytesReceived / bytesExpected * 100;
		console.log("received " + bytesReceived + "/"+ bytesExpected + "    "+ percent.toFixed(2));
	});
	form.parse(request, function (error, fields,files){
		console.log("parse done");
    if(files) {
        fs.renameSync(files.upload.path, "/Users/Gechanghang/Pictures/mynodejs.png");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
    }
	});
	                                 };

function show(response,request) {
	console.log("Request handler 'show' was called.");
	fs.readFile("/Users/Gechanghang/Pictures/mynodejs.png",function(error, file){
		  if(error) {
      			response.writeHead(500, {"Content-Type": "text/plain"});
      			response.write(error + "\n");
      			response.end();
			}else {
				 response.writeHead(200, {"Content-Type": "image/png"});
      			 response.write(file, "binary");
      			 response.end()
			}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;