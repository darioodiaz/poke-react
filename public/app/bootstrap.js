var client = io("http://localhost:9000");
var ReactPokeArena;

var game =  {
	render: render, componentDidMount: componentDidMount,
	show: show, search: search,
	onError: onError, onLoginOk: onLoginOk,
	onBattle: onBattle
};
function onBattle(opponent) {
	if (!ReactPokeArena) {
		React.render(<PokeArena opponent={opponent} />, document.getElementById("pokeArena"));
	}
};
function componentDidMount() {
	client.on("server_loginOk", this.onLoginOk);
	client.on("server_loginError", this.onError);
	client.on("server_pokemonError", this.onError);
};
function search(name) {
	this.refs.PokeList.search(name);
};
function onLoginOk() {
	this.refs.PokeTrainer.loginOk();
};
function onError(data) {
	this.refs.GameInfo.showError(data.message);
};
function show(info) {
	this.refs.PokeInfo.show(info);
};
function render () {
	var Jumbotron = ReactBootstrap.Jumbotron;
	return (
		<div>
			<Jumbotron className="game-header">
				<span></span>
				<h1 className="text-center">Pokemon ! Catch them all</h1>
			</Jumbotron>

			<div style={ { width: '25%', display: 'inline-block', float: 'left', marginRight: '15px' } }>
				<PokeTrainer onBattle={this.onBattle} ref="PokeTrainer" />
			</div>
			<div style={ { width: '70%', display: 'inline-block', float: 'left' } }>
				<PokeSearch search={this.search} />
				<PokeList show={this.show} ref="PokeList" />
			</div>
    		<PokeInfo ref="PokeInfo" />
    		<GameInfo ref="GameInfo" />
		</div>
	);
};
var App = React.createClass(game);
React.render(<App />, document.getElementById("app"));