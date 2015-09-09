var pkm =  {
	render: render, componentDidMount: didMount, search: search,
	propTypes: {
		search: React.PropTypes.func.isRequired
	}
};
function search() {
	//this.props.show(this.state.info);
};
function didMount() {
	var self = this;
	$.get("http://pokeapi.co/api/v1/pokemon/".concat(this.props.id)).success(function(data) { self.setState({ info: data }); });
};
function render () {
	var Input = ReactBootstrap.Input;
	var Glyphicon = ReactBootstrap.Glyphicon
	return (
		<form onSubmit={this.onSubmit}>
    		<Input type="text" placeholder="Type pokemon name..." addonAfter=<Glyphicon glyph="search" /> />
  		</form>
		);
};
var Pokemon = React.createClass(pkm);