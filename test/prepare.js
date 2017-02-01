let express = require('express'),
	body = require('body-parser'),
	router = require('express').Router(),
	routes = require('./routes'),
	wrapper = require('../index'),
	app = express();


module.exports = function (opt) {
	app.set('debug', false);
	app.use(body.json());
	routes(router);
	app.use(wrapper(router, opt));

	let server = app.listen(3000, () => {
		let host = server.address().address,
			port = server.address().port;

		console.log(host, port);
	});
};