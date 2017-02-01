module.exports = function (route) {
	route.get('/val-error', function (req, res, next) {
		res.reply.valError('valError text', {test: 0});
		next();
	});

	route.get('/redirect/*', function (req, res, next) {
		res.send('Redirect' + res.reply.message);
		next();
	});

	route.get('/custom-error', function (req, res, next) {
		res.reply.error(403);
		next();
	});

	route.get('/get', function (req, res, next) {
		console.log(res.reply);
		//res.reply.set('test', 6);
		next();
	});
};