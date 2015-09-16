var gameInfoMdal =  {
	render: render, getInitialState: getInitialState, 
  onHide: onHide,
  showError: showError
};
function showError(info) {
  this.setState({ info: info, show: true });
};
function onHide() {
	this.setState({ info: "", show: false });
};
function getInitialState() {
	return { 
    info: "",
    show: false
  };
};
function render () {
	var Modal = ReactBootstrap.Modal;
	var Button = ReactBootstrap.Button;
  var Glyphicon = ReactBootstrap.Glyphicon;
	return (
		<Modal bsSize="small" show={this.state.show} onHide={this.onHide}>
          <Modal.Header closeButton>
            <Modal.Title><Glyphicon glyph="warning-sign" /> Game Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.info}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onHide}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
        );
};
var GameInfo = React.createClass(gameInfoMdal);