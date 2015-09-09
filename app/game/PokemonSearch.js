var pokeSearch =  {
	render: render, onSubmit: onSubmit, doPokeSearch: doPokeSearch,
	propTypes: {
		search: React.PropTypes.func.isRequired
	}
};
function onSubmit(e) {
	e.preventDefault();
	this.props.search(this.refs.txt_pokeName.getValue());
	this.refs.txt_pokeName.setValue("");
};
function doPokeSearch() {
	this.props.search(this.refs.txt_pokeName.getValue());
};
function render () {
	var Input = ReactBootstrap.Input;
	var Glyphicon = ReactBootstrap.Glyphicon;	
	var Panel = ReactBootstrap.Panel;	
	return (
		<Panel header="Pokemon search" bsStyle="info">
			<form onSubmit={this.onSubmit}>
    			<Input onChange={this.doPokeSearch} ref="txt_pokeName" type="text" placeholder="Type pokemon name..." addonAfter={<Glyphicon glyph="search" />} />
  			</form>
    	</Panel>
		);
};
var PokeSearch = React.createClass(pokeSearch);