var faye = require("faye");
var http = require("http");
var clients = {};

var server = http.createServer(),
    pokeReactServer = new faye.NodeAdapter({mount: '/'});

pokeReactServer.attach(server);
server.listen(9000);
function initServer() {
	console.log("Server started in 9000");
	pokeReactServer.getClient().subscribe("/requestLogin", onTrainerLogin);
};

function onTrainerLogin(data) {
	clients.push(data);
	pokeReactServer.getClient().publish("/trainers", { trainers: clients });
};

initServer();