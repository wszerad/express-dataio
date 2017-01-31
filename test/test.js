let express = require('express'),
	request = require('request'),
	assert = require('assert'),
	body = require('body-parser'),
	router = require('express').Router(),
	routes = require('./routes'),
	wrapper = require('../index'),
	app = express(),
	opt = {
		error: {
			redirect: false
		}
	};

//before(function () {
	app.set('debug', true);
	app.use(body.json());
	routes(router);
	app.use(wrapper(router, opt));

	let host, port;
	let server = app.listen(3000, () => {
		host = server.address().address;
		port = server.address().port;
		console.log(host, port);
	});
//});

/*
describe('#find()', function() {
	it('respond with matching records', function(done) {
		request.get('notFound', function (err, response, body) {
			assert.equal()
			done();
		});
	});
});*/