const ResponseError = require('./ResponseError');
const ValidationError = require('./ValidationError');
const _ = require('lodash');

class Reply {
	constructor(req, res, next) {
		Object.defineProperties(this, {
			next: {
				value: next,
				enumerable: false,
				writable: false
			}
		});
	}

	set(name, data) {
		this[name] = data;
	}

	//overwrite even with undefined
	assign() {
		_.assign(this, ...arguments);

		return this;
	}

	//extend child object, ignore undefined
	merge() {
		_.merge(this, ...arguments);

		return this;
	}

	//ignore overwrites
	defaults() {
		_.defaultsDeep(this, ...arguments);

		return this;
	}

	has(key) {
		return this.hasOwnProperty(key) && this.propertyIsEnumerable(key);
	}

	valError() {
		return this.next(new ValidationError(...arguments));
	}

	error() {
		return this.ResponseError(...arguments);
	}

	resError() {
		return this.next(new ResponseError(...arguments));
	}
}

module.exports = Reply;