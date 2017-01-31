module.exports = function (route) {
	route.get('/get', function (req, res, next) {
		console.log(res.reply);
		//res.reply.set('test', 6);
		next();
	});
};