const ValidationError = require('./models/ValidationError');

module.exports = function (opt) {
	let ajvOpt = Object.assign({
			v5: true
		}, opt.ajv || {}),
		ajv = require('ajv')(ajvOpt),
		validators = {};

	Object.keys(opt.definitions).forEach((def)=>{
		ajv.addSchema(opt.definitions[def], def);

		validators[def] = function (value) {
			let tester = ajv.getSchema(def);

			return !tester(value) && tester.errors[0];
		}
	});

	return function(required, optional, skipValidation) {
		return function (req, res, next) {
			let store = req.store = {},
				path, error, value;

			if (Array.isArray(required)) {
				required.some((arg)=> {
					if (req.body.hasOwnProperty(arg)) {
						store[arg] = req.body[arg];
					} else if (req.params.hasOwnProperty(arg)) {
						store[arg] = req.params[arg];
					} else {
						store[arg] = undefined;
					}

					if (!skipValidation) {
						if(!validators[arg]) {
							return res.reply.error(500, 'Unknown data field: ' + arg);
						}

						path = arg;
						value = store[arg];
						return error = validators[arg](store[arg]);
					}
				});
			}

			if (!error && Array.isArray(optional))
				optional.some((arg)=> {
					if (req.body.hasOwnProperty(arg)) {
						store[arg] = req.body[arg];
					} else if (req.params.hasOwnProperty(arg)) {
						store[arg] = req.params[arg];
					}

					if (!skipValidation && store[arg] !== undefined && store[arg] !== null) {
						if(!validators[arg]) {
							return res.reply.error(500, 'Unknown data field: ' + arg);
						}

						path = arg;
						value = store[arg];
						return error = validators[arg](store[arg]);
					}
				});

			if (error) {
				error.dataPath = path;
				error.value = value;
				return next(new ValidationError(error.message, error));
			}

			next();
		}
	}
};
