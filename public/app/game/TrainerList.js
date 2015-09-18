var trainerList =  {
	render: render, getInitialState: getInitialState,
	componentDidMount: onMount, updateTrainerList: updateTrainerList,
	prepareBattle: prepareBattle
};
function onMount() {
	client.on("server_updateTrainerList", this.updateTrainerList );
	client.emit("requestTrainerList");
};
function getInitialState() {
	return {
		trainersForBattle: []
	};
}
function updateTrainerList(trainers) {
	var trainersForBattle = [];
	for(var key in trainers) {
		if (trainers[key].id == client.id) {
			return;
		}
		trainersForBattle.push({ name: trainers[key].name  });
	}
	this.setState({ trainersForBattle: trainersForBattle });
};
function prepareBattle() {

};
function render () {
	var Dropdown = ReactBootstrap.Dropdown;
	var Glyphicon = ReactBootstrap.Glyphicon;	
	var MenuItem = ReactBootstrap.MenuItem;	
	return (
		<Dropdown disabled={this.state.trainersForBattle.length == 0} bsStyle="warning" title="Battle" id="trainersForBattle">
      		<Dropdown.Toggle>
        		<Glyphicon glyph="flash" />
        		Battle !
      		</Dropdown.Toggle>
	        <Dropdown.Menu>{
		        this.state.trainersForBattle.map(function(item, i) {
					return <MenuItem key={i} eventKey={i} onSelect={this.prepareBattle} >{item.name + " - " + item.pokemon}</MenuItem>
				})
	      	}</Dropdown.Menu>
    	</Dropdown>);
};
var TrainerList = React.createClass(trainerList);