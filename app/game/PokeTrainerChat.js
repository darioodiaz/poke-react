var pokeTrainerChat =  {
	render: render, getMessages, onSubmit: onSubmit, componentDidMount: pokeTrainerChatOnMount, getInitialState: getInitialState,
	enable: enable
};
function enable(trainer) {
	this.trainer = trainer;
	this.setState({ disabled: false });
	this.refs.txt_msj.getInputDOMNode().focus();
};
function pokeTrainerChatOnMount() {
	var self = this;
	client.subscribe("/chat", onNewChat);
	function onNewChat(data) {
		self.state.messages.push(data);
		self.setState(self.state.messages);
	};
};
function onSubmit(e) {
	e.preventDefault();
	client.publish("/chat", { trainer: this.trainer, message: this.refs.txt_msj.getValue() });
	this.refs.txt_msj.getInputDOMNode().value = "";
};
function getInitialState() {
	return {
		messages: [],
		disabled: true,
	};
};
function getMessages() {
	return this.state.messages.map(function(item, i) {
		return (<TrainerMessage key={i} trainer={item.trainer} message={item.message} />)
	});
};
function render () {
	var Input = ReactBootstrap.Input;
	var Glyphicon = ReactBootstrap.Glyphicon;	
	var ListGroup = ReactBootstrap.ListGroup;	
	return (
		<div>
			<ListGroup>
				{this.getMessages()}
			</ListGroup>
			<form onSubmit={this.onSubmit}>
    			<Input disabled={this.state.disabled} ref="txt_msj" required="true" type="text" placeholder="Type your message here..." addonAfter={<Glyphicon glyph="send" />} />
  			</form>
		</div>
		);
};
var PokeTrainerChat = React.createClass(pokeTrainerChat);