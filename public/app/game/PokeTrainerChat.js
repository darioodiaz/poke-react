var pokeTrainerChat =  {
	render: render, getMessages, onSubmit: onSubmit, componentDidMount: pokeTrainerChatOnMount, getInitialState: getInitialState,
	enable: enable
};
function enable(trainer) {
	this.trainer = trainer;
	this.setState({ disabled: false });
	setTimeout( (function() {
		this.refs.txt_msj.getInputDOMNode().focus();
	}).bind(this), 100);
};
function pokeTrainerChatOnMount() {
	client.on("server_chat", onNewChat.bind(this) );
	function onNewChat(data) {
		this.state.messages.push(data);
		this.setState(this.state.messages);
		setTimeout(function() {
			document.getElementsByClassName("poke-messages")[0].scrollTop = document.getElementsByClassName("poke-messages")[0].scrollHeight;
		}, 100);
	};
};
function onSubmit(e) {
	e.preventDefault();
	client.emit("chat", { trainer: this.trainer, message: this.refs.txt_msj.getValue() });
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
			<ListGroup className="poke-messages">
				{this.getMessages()}
			</ListGroup>
			<form onSubmit={this.onSubmit}>
    			<Input disabled={this.state.disabled} ref="txt_msj" required="true" type="text" placeholder="Type your message here..." addonAfter={<Glyphicon glyph="send" />} />
  			</form>
		</div>
		);
};
var PokeTrainerChat = React.createClass(pokeTrainerChat);