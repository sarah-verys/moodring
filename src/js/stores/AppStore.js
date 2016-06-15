var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WeFeelAPI = require('../utils/WeFeelAPI');

var CHANGE_EVENT = 'change';

var _continents = [];
var _selectedContinent = '';
var _currentMoods = [];


var AppStore = assign({}, EventEmitter.prototype, {
	getContinents: function() {
		return _continents;
	},
	getSelectedContinent: function() {
		return _selectedContinent;
	},
	getCurrentMoods: function() {
		return _currentMoods;
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback) {
		this.on('change', callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener('change', callback)
	}
});

AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch (action.actionType) {
		case AppConstants.GET_CONTINENTS:
			WeFeelAPI.getContinents();
			break;
		case AppConstants.RECEIVE_CONTINENT_RESULTS:
			// TODO: Set State
			AppStore.emit(CHANGE_EVENT);
			break;
	}

	return true;
});

module.exports = AppStore;