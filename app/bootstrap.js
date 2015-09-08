var game =  {
	render: render,
	getInitialState: getInitialState,
	show: show
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
			<Panel header="Pokemons" bsStyle="primary">
				{this.state.pokemons}
    		</Panel>
    		<PokeInfo info={this.state.pokeInfo} />
		</div>
	);
};

var App = React.createClass(game);
React.render(<App />, document.getElementById("app"));