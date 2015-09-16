var pokeTrainer =  {
	render: render, onSubmit: onSubmit, componentDidMount: onMount,
	onLoginOk: onLoginOk, onLoginError: onLoginError,
	propTypes: {
		onError: React.PropTypes.func.isRequired
	}
};
function onMount() {
	client.on("server_loginOk", this.onLoginOk);
	client.on("server_loginError", this.onLoginError);
};
function onLoginError(data) {
	this.props.onError(data.message);
};
function onLoginOk() {
	this.refs.PokeTrainerChat.enable(this.refs.txt_trainer.getValue());
	this.refs.txt_trainer.getInputDOMNode().disabled = true;
};
function onSubmit(e) {
	e.preventDefault();
	client.emit("requestLogin", { name: this.refs.txt_trainer.getValue() });
};
function render () {
	var Input = ReactBootstrap.Input;
	var Glyphicon = ReactBootstrap.Glyphicon;	
	var Panel = ReactBootstrap.Panel;	
	return (
		<Panel header="Trainer Panel" bsStyle="success">
			<form onSubmit={this.onSubmit}>
    			<Input bsSize="small" ref="txt_trainer" required="true" type="text" placeholder="Type your trainer's name here..." addonAfter={<Glyphicon glyph="record" />} />
  			</form>
  			<PokeTrainerChat ref="PokeTrainerChat" />
    	</Panel>
		);
};
var PokeTrainer = React.createClass(pokeTrainer);