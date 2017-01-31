const ResponseError = require('./models/ResponseError');
const util = require('util');

module.exports = function (opt = {}) {
	return function (req, res, next) {
		if (req.route === undefined) {
			return next(new ResponseError(404));
		} else if (!res.headersSent) {
			if (req.xhr) {
				res.send({
					reply: res.reply || null,
					status: 'ok'
				});
			} else if (res.reply) {
				res.end(util.inspect(res.reply, {depth: null}));
			} else {
				res.end('');
			}
		}

		next();
	};
};