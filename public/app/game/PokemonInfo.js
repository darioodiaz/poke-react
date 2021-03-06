var pkmInfo =  {
	render: render, getInitialState: getInitialState, 
  onHide: onHide,
	componentWillReceiveProps: componentWillReceiveProps,
	getBigPhoto: getBigPhoto, show: showPokeInfo,
  selectPokemon: selectPokemon
};
function selectPokemon() {
  client.emit("requestPokemon", { trainer: client.trainer, id: client.id, pokemon: this.state.info.national_id });
  if (!client.pokemonData) {
    client.pokemonData = this.state.info;
  }
  this.onHide();
};
function showPokeInfo(info) {
  this.setState({ info: info });
};
function componentWillReceiveProps(nextProps) {
  if (this.state.info.national_id != nextProps.national_id) {
    this.setState({ info: nextProps });
  }
};
function getBigPhoto() {
	if (!this.state.info.name) { return; }
	return "http://img.pokemondb.net/artwork/".concat(this.state.info.name.toLowerCase()).concat(".jpg");
};
function onHide() {
	this.setState({ info: {} });
};
function getInitialState() {
	return { info: {} };
};
function render () {
	var Modal = ReactBootstrap.Modal;
	var Button = ReactBootstrap.Button;
	var FormControls = ReactBootstrap.FormControls;
	return (
		<Modal bsSize="medium" show={Object.keys(this.state.info) != 0} onHide={this.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Pokemon Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className="big-poke" src={this.getBigPhoto()} />
            <form className="form-horizontal">
                <FormControls.Static label="Name" labelClassName="col-xs-6" wrapperClassName="col-xs-6" value={this.state.info.name} />
                <FormControls.Static label="Attack" labelClassName="col-xs-6" wrapperClassName="col-xs-6" value={this.state.info.attack} />
                <FormControls.Static label="Defense" labelClassName="col-xs-6" wrapperClassName="col-xs-6" value={this.state.info.defense} />
                <FormControls.Static label="HP" labelClassName="col-xs-6" wrapperClassName="col-xs-6" value={this.state.info.hp} />
                <FormControls.Static label="Special attack" labelClassName="col-xs-6" wrapperClassName="col-xs-6" value={this.state.info.sp_atk} />
                <FormControls.Static label="Special defense" labelClassName="col-xs-6" wrapperClassName="col-xs-6" value={this.state.info.sp_def} />
                <FormControls.Static label="Speed" labelClassName="col-xs-6" wrapperClassName="col-xs-6" value={this.state.info.speed} />
              </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={this.selectPokemon}>Select!</Button>
            <Button onClick={this.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
        );
};
var PokeInfo = React.createClass(pkmInfo);