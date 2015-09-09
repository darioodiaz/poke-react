var pkmInfo =  {
	render: render, getInitialState: getInitialState, 
	closeModal: closeModal, onHide: onHide,
	componentWillReceiveProps: componentWillReceiveProps,
	getBigPhoto: getBigPhoto,
	propTypes: {
		info: React.PropTypes.object.isRequired		
	}
};
function componentWillReceiveProps(nextProps) {
  if (this.props.info.national_id != nextProps.national_id) {
    this.setState({ info: nextProps });
  }
};
function getBigPhoto() {
	if (!this.props.info.name) { return; }
	return "http://img.pokemondb.net/artwork/".concat(this.props.info.name.toLowerCase()).concat(".jpg");
};
function onHide() {
	this.setState({ info: {} });
};
function closeModal() {
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

          <div className="col-sm-12">
          	<img className="col-sm-4 big-poke" src={this.getBigPhoto()} />
          	<div className="col-sm-8">
          		<form className="form-horizontal">
          			<FormControls.Static label="Name" labelClassName="col-xs-6" wrapperClassName="col-xs-6" value={this.props.info.name} />
          			<FormControls.Static label="Attack" labelClassName="col-xs-6" wrapperClassName="col-xs-6" value={this.props.info.attack} />
          			<FormControls.Static label="Defense" labelClassName="col-xs-6" wrapperClassName="col-xs-6" value={this.props.info.defense} />
          			<FormControls.Static label="HP" labelClassName="col-xs-6" wrapperClassName="col-xs-6" value={this.props.info.hp} />
          			<FormControls.Static label="Special attack" labelClassName="col-xs-6" wrapperClassName="col-xs-6" value={this.props.info.sp_atk} />
          			<FormControls.Static label="Special defense" labelClassName="col-xs-6" wrapperClassName="col-xs-6" value={this.props.info.sp_def} />
          			<FormControls.Static label="Speed" labelClassName="col-xs-6" wrapperClassName="col-xs-6" value={this.props.info.speed} />
          		</form>
          	</div>
          </div>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
        );
};
var PokeInfo = React.createClass(pkmInfo);