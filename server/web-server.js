var express = require("express");
var server = express();

server.use( express.static("../public") );
server.get("/", function(req, res) {
	res.sendFile("index.html", { root: "public" });
});

server.listen(8000, function() {
	console.log("Express on 8000");
});