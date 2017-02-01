let prepare = require('./prepare'),
	request = require('request'),
	assert = require('assert'),
	opt = {
		error: {
			redirect: false
		}
	};

before(function () {
	prepare(opt);
});

describe('xhr', function() {
	it('not found', function(done) {
		request.get('notFound', function (err, response, body) {
			request.get({
				url: 'http://127.0.0.1:3000/not-found',
				headers: {
					'X-Requested-With': 'XMLHttpRequest'
				},
				json: true
			}, function (err, response, body) {
				assert.equal(body, {message: 'Not Found', model: {}, status: 'error', stack: null});
				done();
			});
		});
	});

	it('not found', function(done) {
		request.get('notFound', function (err, response, body) {
			request.get({
				url: 'http://127.0.0.1:3000/custom-error',
				headers: {
					'X-Requested-With': 'XMLHttpRequest'
				},
				json: true
			}, function (err, response, body) {
				assert.equal(body, {message: 'Not Found', model: {}, status: 'error', stack: null});
				done();
			});
		});
	});
});

describe('basic', function() {
	it('not found', function(done) {
		request.get('notFound', function (err, response, body) {
			request.get({
				url: 'http://127.0.0.1:3000/not-found'
			}, function (err, response, body) {
				assert.equal(body, 'Not Found');
				done();
			});
		});
	});
});