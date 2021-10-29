const matches = require('../../mockDatabase/matches');
/**
 * Gets all matches from the database
 */
module.exports = () => {
	return (req, res, next) => {
		res.locals.matches = matches;
		return next();
	};
};
