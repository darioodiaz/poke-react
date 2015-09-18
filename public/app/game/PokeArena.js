var pokeArena =  {
	render: render, onHide: onHide, 
  prepareBattle: prepareBattle, onSurrender: onSurrender,
  propTypes: {
    opponent: React.PropTypes.object.isRequired
  }
};
function onSurrender() {

};
function prepareBattle(opponent) {
  this.setState({ inBattle: true, opponent: opponent });
};
function onHide() {
	this.setState({ inBattle: false });
};
function render () {
	var Modal = ReactBootstrap.Modal;
	var Button = ReactBootstrap.Button;
	var FormControls = ReactBootstrap.FormControls;
	return (
		<Modal bsSize="medium" show={true} onHide={this.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Battle Arena</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Pokemon id={client.pokemonData.national_id} />
            <Pokemon id={this.props.opponent.pokemon.national_id} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onSurrender}>Surrender</Button>
          </Modal.Footer>
        </Modal>
        );
};
var PokeArena = React.createClass(pokeArena);