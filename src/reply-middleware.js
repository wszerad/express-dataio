const Reply = require('./models/Reply');

module.exports = function (opt = {}) {
	return function (req, res, next) {
		res.reply = new Reply(req, res, next);
		next();
	};
};
