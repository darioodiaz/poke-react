var trainerMsj =  {
	render: render,
	propTypes: {
		trainer: React.PropTypes.string.isRequired,
		message: React.PropTypes.string.isRequired
	}
};
function render () {
	var ListGroupItem = ReactBootstrap.ListGroupItem;	
	return (
		<ListGroupItem>{this.props.trainer}: {this.props.message}</ListGroupItem>
  		);
};
var TrainerMessage = React.createClass(trainerMsj);