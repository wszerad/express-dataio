class ValidationError extends Error {
	constructor(message = '', model = {}) {
		super(message);

		this.name = 'ValidationError';
		this.status = 400;
		this.model = model;
		this.stack = (new Error()).stack;
	}
}

module.exports = ValidationError;