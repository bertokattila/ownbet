const matches = require('../../mockDatabase/matches');
/**
 * Gets the upcoming matches from the db and them it on res.locals
 */
module.exports = () => {
	return (req, res, next) => {
		res.locals.matches = matches;

		return next();
	};
};
