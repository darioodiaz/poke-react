var pokeTrainer =  {
	render: render, onSubmit: onSubmit
};
function onSubmit(e) {
	e.preventDefault();
	this.refs.PokeTrainerChat.enable(this.refs.txt_trainer.getValue());
	this.refs.txt_trainer.getInputDOMNode().disabled = true;
	client.publish("/requestLogin", { name: this.refs.txt_trainer.getValue() });
};
function render () {
	var Input = ReactBootstrap.Input;
	var Glyphicon = ReactBootstrap.Glyphicon;	
	var Panel = ReactBootstrap.Panel;	
	return (
		<Panel header="Poke Trainer Panel" bsStyle="success">
			<form onSubmit={this.onSubmit}>
    			<Input bsSize="small" ref="txt_trainer" required="true" type="text" placeholder="Type your trainer's name here..." addonAfter={<Glyphicon glyph="record" />} />
  			</form>
  			<PokeTrainerChat ref="PokeTrainerChat" />
    	</Panel>
		);
};
var PokeTrainer = React.createClass(pokeTrainer);