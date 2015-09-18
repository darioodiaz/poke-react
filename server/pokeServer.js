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
	socket.on("requestBattle", onRequestBattle.bind(socket) );
	socket.on("chat", onChat.bind(socket) );
};
function onRequestTrainerList() {
	this.emit("server_updateTrainerList", trainers);
};
function onRequestBattle(who, opponent) {
	server.sockets.forEach(function(socket) {
		if (socket.id == opponent) {

		}
	});
};
function onRequestPokemon(data) {
	if (!trainers[data.trainer]) {
		this.emit("server_pokemonError", { message: "First tell your trainer nickname in the Trainer Panel" });	
		return;
	}
	if ( selectedPokemons["p_".concat(data.pokemon.national_id)] ) {
		this.emit("server_pokemonError", { message: "This pokemon was selected or you have a pokemon" });	
	} else {
		console.log(data.pokemon.name, " is available");
		selectedPokemons["p_".concat(data.pokemon.national_id)] = true;
		trainers[data.trainer].pokemon = data.pokemon;
		this.emit("server_pokemonRequestAccepted", data.pokemon);
		server.sockets.emit("server_updateTrainerList", trainers);
		server.sockets.emit("server_updatePokeList", selectedPokemons);
	}
};
function onRequestLogin(data) {
	if ( !trainers[data.name] ) {
		console.log(data.name, " has been logged");
		trainers[data.name] = { name: data.name, id: this.id };
		this.emit("server_loginOk", { id: this.id });
		setTimeout(function() { server.sockets.emit("server_updateTrainerList", trainers); }, 100);
	} else {
		this.emit("server_loginError", { message: "Trainer name is in use" });
	}
};
function onRequestPokeList() { 
	server.sockets.emit("server_updatePokeList", selectedPokemons); 
};
function onChat(data) { server.sockets.emit("server_chat", data); };

server.listen(9000); console.log("Socket server in 9000");