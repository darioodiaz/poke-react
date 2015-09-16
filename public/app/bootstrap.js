var client = new Faye.Client('http://localhost:9000/');

var game =  {
	render: render,
	getInitialState: getInitialState,
	show: show,
	search: search,
	onLoad: onLoad,
	getPokemons: getPokemons
};
function onLoad(pokeName, id) {
	this.state.pokeNames[id] = pokeName;
	//this.setState({ pokeNames: this.state.pokeNames });
};
function search(name) {
	var filteredPokemons = [];
	var self = this;
	if(name) {
		this.state.pokeNames.forEach(function(item, id) {
			if (item.toLowerCase().indexOf(name) != -1) {
				filteredPokemons.push(self.state.pokemons[id]);
			}
		});
	}
	this.setState({ filteredPokemons: filteredPokemons });	
};
function getPokemons() {
	if (this.state.filteredPokemons.length == 0) {
		return this.state.pokemons;
	} else {
		return this.state.filteredPokemons;
	}
};
function show(info) {
	this.refs.PokeInfo.show(info);
};
function getInitialState() {
	var pokemons = [];
	var pokeNames = [];
	var i = 1;
	while(i <= 10) {
		pokemons.push( <Pokemon onLoad={this.onLoad} show={this.show} key={i} id={i} /> );
		pokeNames.push("");
		i++;
	}
	return {
		pokemons: pokemons,
		pokeNames: pokeNames,
		filteredPokemons: []
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

			<div style={ { width: '25%', display: 'inline-block', float: 'left', marginRight: '15px' } }>
				<PokeTrainer />
			</div>
			<div style={ { width: '70%', display: 'inline-block', float: 'left' } }>
				<PokeSearch search={this.search} />
				<Panel header="Pokemons" bsStyle="primary">{this.getPokemons()}</Panel>
			</div>
    		<PokeInfo ref="PokeInfo" />
		</div>
	);
};

var App = React.createClass(game);
React.render(<App />, document.getElementById("app"));