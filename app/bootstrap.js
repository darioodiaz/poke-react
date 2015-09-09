var game =  {
	render: render,
	getInitialState: getInitialState,
	show: show,
	search: search,
	getPokemons: getPokemons
};
function search(name) {
	if(name) {
		this.state.pokemons.forEach(function() {

		});
	}
};
function getPokemons() {
	if (this.state.filteredPokemons.length == 0) {
		return this.state.pokemons;
	} else {
		return this.state.filteredPokemons;
	}
};
function show(info) {
	this.setState({ pokeInfo: info });
};
function getInitialState() {
	var pokemons = [];
	var i = 1;
	while(i <= 150) {
		pokemons.push( <Pokemon show={this.show} key={i} id={i} /> );
		i++;
	}
	return {
		pokemons: pokemons,
		filteredPokemons: [],
		pokeInfo: {}
	};
};
function render () {
	var Panel = ReactBootstrap.Panel;
	var Jumbotron = ReactBootstrap.Jumbotron;
	return (
		<div>
			<Jumbotron className="game-header">
				<span></span>
				<h1 className="text-center">Pokemon ! Catch them all</h1>
			</Jumbotron>
			<PokeSearch search={this.search} />
			<Panel header="Pokemons" bsStyle="primary">
				{this.getPokemons()}
    		</Panel>
    		<PokeInfo info={this.state.pokeInfo} />
		</div>
	);
};

var App = React.createClass(game);
React.render(<App />, document.getElementById("app"));