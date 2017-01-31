const http = require('http');

class ResponseError extends Error {
	constructor(status, message = null, model = {}) {
		super(message || http.STATUS_CODES[status]);

		this.name = 'ResponseError';
		this.status = status;
		this.model = model;
		this.stack = (new Error(this.message)).stack;
	}
}

module.exports = ResponseError;