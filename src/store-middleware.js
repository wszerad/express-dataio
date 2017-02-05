const ValidationError = require('./models/ValidationError');

module.exports = function (opt) {
	let ajv = require('ajv')({
			v5: true
		}),
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
				path, error;

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
						path = arg;
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
						path = arg;
						return error = validators[arg](store[arg]);
					}
				});

			if (error) {
				error.dataPath = path;
				return next(new ValidationError(error, {path}));
			}

			next();
		}
	}
};
