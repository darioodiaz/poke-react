var io = require("socket.io");
var server = io();
var trainers = {};
var selectedPokemons = {};

server.on("connection", onNewConnection);

function onNewConnection(socket) {
	socket.on("requestLogin", onRequestLogin.bind(socket) );
	socket.on("chat", onChat.bind(socket) );
};

function onRequestLogin(data) {
	if ( !trainers[data.name] ) {
		console.log(data.name, " has been logged");
		trainers[data.name] = { name: data.name, id: this.id };
		this.emit("server_loginOk", { id: this.id });
		server.emit("server_trainersList", trainers);
	} else {
		this.emit("server_loginError", { message: "Trainer name is in use" });
	}
};
function onChat(data) {
	server.emit("server_chat", data);
};

server.listen(9000);
console.log("Socket server in 9000");