var AppActions = require('../actions/AppActions');
var popsicle = require('popsicle');

module.exports = {
	getContinents: function() {
		// popsicle.get('http://api.klout.com/v2/identity.json/twitter?screenName=loomisfreeman&key=3zujc57adrz633twyvpmffm9') // Trying another API...
		popsicle.get('http://wefeel.csiro.au/api/zones/continents')
			.then(function (response) {
				console.log(234324,response)
				if (response.status > 199 && response.status < 400) {
					AppActions.receiveContinentResults(response.body)
				} else {
					// Error			    
					console.log(222,response)
				}
		 	})
	}
}