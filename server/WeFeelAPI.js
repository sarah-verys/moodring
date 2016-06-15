var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var popsicle = require('popsicle');

var app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/weFeel', function(req, res, next) {
	popsicle.get('http://wefeel.csiro.au/api/zones/continents')
		.then(function (response) {
			res.status(200).send(response.body);
	 	})
		.catch(function (err) {
			if (err) {
				console.error('There was an error getting from weFeel', err);
			}
			res.status(500).send({ error: err });
		})
});

app.listen(7676, console.log.bind(console, 'weFeel API available on localhost:7676/weFeel'));
module.exports = app;
