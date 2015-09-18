var io = require("socket.io");
var server = io();
var trainers = {};
var selectedPokemons = {};

server.on("connection", onNewConnection);

function onNewConnection(socket) {
	socket.on("requestLogin", onRequestLogin.bind(socket) );
	socket.on("requestPokeList", onRequestPokeList.bind(socket) );
	socket.on("requestTrainerList", onRequestTrainerList.bind(socket) );
	socket.on("requestPokemon", onRequestPokemon.bind(socket) );
	socket.on("chat", onChat.bind(socket) );
};
function onRequestTrainerList() {
	this.emit("server_updateTrainerList", trainers);
};
function onRequestPokemon(data) {
	if (!data.trainer) {
		this.emit("server_pokemonError", { message: "First tell your trainer nickname in the Trainer Panel" });	
		return;
	}
	if ( selectedPokemons["p_".concat(data.id)] ) {
		this.emit("server_pokemonError", { message: "This pokemon was selected or you have a pokemon" });	
	} else {
		console.log("Pokemon ", data.pokemon, " is available");
		selectedPokemons["p_".concat(data.id)] = { pokemon: data.pokemon };
		server.emit("server_updatePokeList", selectedPokemons);
	}
};
function onRequestLogin(data) {
	if ( !trainers[data.name] ) {
		console.log(data.name, " has been logged");
		trainers[data.name] = { name: data.name, id: this.id };
		server.emit("server_updateTrainerList", trainers);
		this.emit("server_loginOk", { id: this.id });
	} else {
		this.emit("server_loginError", { message: "Trainer name is in use" });
	}
};
function onRequestPokeList() { server.emit("server_updatePokeList", selectedPokemons); };
function onChat(data) { server.emit("server_chat", data); };

server.listen(9000); console.log("Socket server in 9000");