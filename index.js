const Router = require('express').Router;

const errorMiddleware = require('./src/error-middleware');
const storeMiddleware = require('./src/store-middleware');
const responseMiddleware = require('./src/response-middleware');
const replyMiddleware = require('./src/reply-middleware');

const ResponseError = require('./src/models/ResponseError');
const ValidationError = require('./src/models/ValidationError');

function wrapper(route, opt = {}) {
	let router = Router();

	router.use(replyMiddleware(opt.reply));
	router.use(route);
	router.use(responseMiddleware(opt.response));
	router.use(errorMiddleware(opt.error));

	return router;
}

wrapper.middleware = {
	store: storeMiddleware,
	error: errorMiddleware,
	response: responseMiddleware,
	reply: replyMiddleware
};

wrapper.model = {
	ResponseError,
	ValidationError
};

module.exports = wrapper;