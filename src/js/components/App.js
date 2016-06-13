var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

// Holds all of our state values
function getAppState() {
	return {

	}
}

var App = React.createClass({

	getInitialState: function() {
		return {}
	},

	// Flux add change listener
	componentDidMount: function() {
		AppStore.addChangeListener(this.__onChange);
	},


	// Flux remove change listener
	componentUnmount: function() {
		AppStore.removeChangeListener(this.__onChange);
	},

	render: function() {
		return (
			<div>
				HELLO WORLD
			</div>
		)
	},

	// Set our state again whenever it's re-rendered
	__onChange: function() {
		this.setState(getAppState());
	}

});

module.exports = App;