var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
	getContinents: function() {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.GET_CONTINENTS
		})
	},
	receiveContinentResults: function(continents) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.RECEIVE_CONTINENT_RESULTS,
			movies: movies
		})
	}
}

module.exports = AppActions;
