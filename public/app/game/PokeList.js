var pokeList =  {
	render: render, componentDidMount: onPokeListMount, 
	getInitialState: getInitialState, updatePokeList: updatePokeList,
	search: search, firstTime: true,
	propTypes: {
		show: React.PropTypes.func.isRequired
	}
};
function getInitialState() {
	return {
		pokemons: []
	}
}
function onPokeListMount() {
	client.on("server_updatePokeList", this.updatePokeList);
	client.emit("requestPokeList");
};
function search(name) {
	var pokemons = [];
	if(name) {
		this.pokemons.forEach( iterateFn.bind(this) );
		this.setState({ pokemons: pokemons });	
	}
	function iterateFn(item, id) {
		if (item.getName().toLowerCase().indexOf(name) != -1) {
			pokemons.push(this.pokemons[id]);
		}
	};
};
function updatePokeList(selectedPokemons) {
	for (var key in selectedPokemons) {
		this.refs["poke_" + selectedPokemons[key].pokemon].available(false);
	}
	this.firstTime = false;
	this.forceUpdate();
};
function render () {
	var Panel = ReactBootstrap.Panel;
	return (
		<Panel header="Pokemons" bsStyle="primary">
		{ (function() {
				if (!this.firstTime) {
					return;
				}
				var i=1;
				while(i <= 10) {
					this.state.pokemons.push( <Pokemon ref={"poke_"+i} show={this.props.show} key={i} id={i} /> );
					i++;
				}
			}).bind(this)()
		}
		{ this.state.pokemons }
		</Panel>
		);
};
var PokeList = React.createClass(pokeList);