var pkm =  {
	render: render, getInitialState: getInitialState, componentDidMount: didMount, getSpriteUrl: getSpriteUrl, showInfo: showInfo,
	propTypes: {
		id: React.PropTypes.number.isRequired
	}
};
function showInfo() {
	this.props.show(this.state.info);
};
function getSpriteUrl() {
	if (this.state.info.name.toLowerCase().indexOf("loading") != -1) { return; }
	return ("http://img.pokemondb.net/sprites/black-white/anim/normal/".concat( this.state.info.name.toLowerCase() ).concat(".gif") );
};
function didMount() {
	var self = this;
	$.get("http://pokeapi.co/api/v1/pokemon/".concat(this.props.id)).success(function(data) { 
		self.props.onLoad(data.name, self.props.id - 1);
		self.setState({ info: data }); 
	});
};
function getInitialState() {
	return {
		info: { name: "Loading..." }
	};
};
function render () {
	var Button = ReactBootstrap.Button;
	return (
		<Button onClick={this.showInfo} className="poke-btn">
			<span className="label label-info">{this.state.info.name}</span>
			<img src={this.getSpriteUrl()} />
		</Button>
		);
};
var Pokemon = React.createClass(pkm);