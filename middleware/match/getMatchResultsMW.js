const results = require('../../mockDatabase/results');
/**
 * Gets matches with administered result from the database
 */
module.exports = () => {
	return (req, res, next) => {
		res.locals.results = results;
		return next();
	};
};
