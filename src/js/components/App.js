var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var ContinentForm = require('./ContinentForm');

// Holds all of our state values
function getAppState() {
	return {
		continents: AppStore.getContinents(),
		selectedContinent: AppStore.getSelectedContinent(),
		currentMoods: AppStore.getCurrentMoods()
	}
}

var App = React.createClass({

	getInitialState: function() {
		return getAppState();
	},

	componentWillMount: function() {
		AppActions.getContinents();
	},

	// Listening to the AppStore 
	componentDidMount: function() {
		AppStore.addChangeListener(this.__onChange);
	},


	// Stop listening to the AppStore
	componentUnmount: function() {
		AppStore.removeChangeListener(this.__onChange);
	},

	render: function() {
		return (
			<div>
				<ContinentForm />
			</div>
		)
	},

	// Set our state again whenever it's re-rendered
	__onChange: function() {
		this.setState(getAppState());
	}

});

module.exports = App;