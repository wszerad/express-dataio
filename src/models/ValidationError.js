class ValidationError extends Error {
	constructor(message, model = {}) {
		super(message || '');

		this.name = 'ValidationError';
		this.status = 400;
		this.model = Object.assign(model, {error: message});
		this.stack = (new Error()).stack;
	}
}

module.exports = ValidationError;