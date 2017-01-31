const ResponseError = require('./models/ResponseError');
const ValidationError = require('./models/ValidationError');
const path = require('path');
const http = require('http');

module.exports = function (opt = {}) {
	return function (err, req, res, next) {
		let isDebug = req.app.get('debug'),
			message = 'Internal Error',
			stack = isDebug ? err.stack || null : null,
			model = err.model || {},
			status = 500;

		if (err instanceof ResponseError) {
			message = err.message;
		} else if (err instanceof ValidationError) {
			status = 400;
			message = 'Data Error';
		}

		if (req.xhr) {
			res.status(status).send({
				message,
				model,
				status: 'error',
				stack
			});
		} else if (opt.redirect) {
			res.redirect(status, path.join(opt.redirect, status));
		} else {
			res.end(stack || message);
		}
	};
};

